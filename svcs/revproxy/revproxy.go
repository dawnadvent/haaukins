package revproxy

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"html/template"
	"io/ioutil"
	"math/rand"
	"time"

	"github.com/aau-network-security/go-ntp/virtual/docker"
)

var (
	baseTmpl, _ = template.New("base").Parse(`
server {
    listen 80;

    {{range .Endpoints}}
    {{.}}
    {{end}}
}
`)
	AlreadyRunningErr = errors.New("Cannot add container when running")
)

type Proxy interface {
	Start(context.Context) error
	Add(docker.Identifier, string) error
	Close()
}

type Connector interface {
	ConnectProxy(Proxy) error
}

type nginx struct {
	cont      docker.Container
	host      string
	running   bool
	endpoints []string
	aliasCont map[string]docker.Identifier
}

func New(host string, connectors ...Connector) (Proxy, error) {
	ng := &nginx{
		host:      host,
		aliasCont: make(map[string]docker.Identifier),
	}

	for _, c := range connectors {
		if err := c.ConnectProxy(ng); err != nil {
			return nil, err
		}
	}

	return ng, nil
}

func (ng *nginx) Close() {
	ng.cont.Kill()
}

func (ng *nginx) Start(ctx context.Context) error {
	confFile, err := ioutil.TempFile("", "nginx_conf")
	if err != nil {
		return err
	}

	tmplCtx := struct {
		Endpoints []string
	}{
		ng.endpoints,
	}
	if err := baseTmpl.Execute(confFile, tmplCtx); err != nil {
		return err
	}

	cConf := docker.ContainerConfig{
		Image: "nginx",
		EnvVars: map[string]string{
			"HOST": ng.host,
		},
		PortBindings: map[string]string{
			"443/tcp": "0.0.0.0:443",
			"80/tcp":  "0.0.0.0:80",
		},
		Mounts: []string{
			fmt.Sprintf("%s:/etc/nginx/conf.d/default.conf", confFile.Name()),
		},
	}

	c, err := docker.NewContainer(cConf)
	if err != nil {
		return err
	}
	ng.cont = c

	fmt.Println(c)

	for alias, cont := range ng.aliasCont {
		if err := c.Link(cont, alias); err != nil {
			return err
		}
	}

	err = c.Start()
	if err != nil {
		return err
	}

	ng.running = true

	return nil
}

func (ng *nginx) Add(c docker.Identifier, conf string) error {
	if ng.running {
		return AlreadyRunningErr
	}
	alias := randAlias(26)

	endpointTmpl, err := template.New(fmt.Sprintf("endpoint")).Parse(conf)
	if err != nil {
		return err
	}

	values := struct {
		Host string
	}{
		Host: alias,
	}
	var b bytes.Buffer
	if err := endpointTmpl.Execute(&b, values); err != nil {
		return err
	}

	ng.aliasCont[alias] = c
	ng.endpoints = append(ng.endpoints, b.String())

	return nil
}

const charset = "abcdefghijklmnopqrstuvwxyz"

var seededRand *rand.Rand = rand.New(
	rand.NewSource(time.Now().UnixNano()))

func randAlias(length int) string {
	b := make([]byte, length)
	for i := range b {
		b[i] = charset[seededRand.Intn(len(charset))]
	}
	return string(b)
}