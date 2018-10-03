package daemon

import (
	"google.golang.org/grpc"
	"google.golang.org/grpc/test/bufconn"
	"testing"

	"context"
	"fmt"
	pb "github.com/aau-network-security/go-ntp/daemon/proto"
	"log"
	"net"
	"time"
)

var lis *bufconn.Listener

const bufSize = 1024 * 1024

type testUserHub struct {
	signupKey string
	err       error

	username string
	password string
	token    string

	UserHub
}

func (t testUserHub) CreateSignupKey() (SignupKey, error) {
	return SignupKey(t.signupKey), t.err
}

func (t testUserHub) AddUser(k SignupKey, username, password string) error {
	if k == SignupKey(t.signupKey) && username == t.username && password == t.password {
		return nil
	}
	return fmt.Errorf("failure")
}

func (t testUserHub) TokenForUser(username, password string) (string, error) {
	if username == t.username && password == t.password {
		return t.token, nil
	}
	return "", fmt.Errorf("failure")
}

func init() {
	lis = bufconn.Listen(bufSize)
	d := &daemon{
		uh: testUserHub{
			signupKey: "keyval",
			err:       nil,
			username:  "user",
			password:  "pass",
			token:     "token",
		},
	}
	s := d.GetServer()

	pb.RegisterDaemonServer(s, d)
	go func() {
		if err := s.Serve(lis); err != nil {
			log.Fatalf("Server exited with error: %v", err)
		}
	}()
}

func bufDialer(string, time.Duration) (net.Conn, error) {
	return lis.Dial()
}

func TestNoToken(t *testing.T) {
	ctx := context.Background()
	conn, err := grpc.Dial("bufnet", grpc.WithDialer(bufDialer), grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial bufnet: %v", err)
	}
	defer conn.Close()

	client := pb.NewDaemonClient(conn)
	req := &pb.InviteUserRequest{}
	_, err = client.InviteUser(ctx, req)
	if err == nil {
		t.Fatalf("Expected an error, but did not receive one")
	}
}

func TestInviteUser(t *testing.T) {

	cases := []struct {
		name     string
		keyValue string
		err      error
	}{
		{"OK", "1", nil},
		{"Error in retrieving SignupKey", "", fmt.Errorf("failure")},
	}

	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			ctx := context.Background()
			d := &daemon{
				uh: testUserHub{
					signupKey: c.keyValue,
					err:       c.err,
				},
			}
			req := &pb.InviteUserRequest{}
			resp, _ := d.InviteUser(ctx, req)

			if resp.Key != c.keyValue {
				t.Fatalf("Expected key '%s', but got '%s'", c.keyValue, resp.Key)
			}
			expectedErrMsg := ""
			if c.err != nil {
				expectedErrMsg = c.err.Error()
			}

			if resp.Error != expectedErrMsg {
				t.Fatalf("Expected error: '%s', but got '%s'", expectedErrMsg, resp.Error)
			}
		})
	}
}

func TestSignupUser(t *testing.T) {
	cases := []struct {
		name     string
		req      pb.SignupUserRequest
		expected pb.LoginUserResponse
	}{
		{
			"OK",
			pb.SignupUserRequest{
				Key:      "keyval",
				Username: "user",
				Password: "pass",
			},
			pb.LoginUserResponse{
				Token: "token",
				Error: "",
			},
		},
		{
			"Invalid signup key",
			pb.SignupUserRequest{
				Key:      "invalid-key",
				Username: "user",
				Password: "pass",
			},
			pb.LoginUserResponse{
				Token: "",
				Error: "failure",
			},
		},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			ctx := context.Background()
			conn, err := grpc.Dial("bufnet", grpc.WithDialer(bufDialer), grpc.WithInsecure())
			if err != nil {
				t.Fatalf("Failed to dial bufnet: %v", err)
			}
			defer conn.Close()

			client := pb.NewDaemonClient(conn)
			resp, _ := client.SignupUser(ctx, &c.req)
			if resp.Error != c.expected.Error {
				t.Fatalf("Expected error '%s', but got '%s'", c.expected.Error, resp.Error)
			}
			if resp.Token != c.expected.Token {
				t.Fatalf("Expected token '%s', but got '%s'", c.expected.Token, resp.Token)
			}
		})
	}
}

func TestLoginUser(t *testing.T) {
	cases := []struct {
		name     string
		req      pb.LoginUserRequest
		expected pb.LoginUserResponse
	}{
		{
			"OK",
			pb.LoginUserRequest{
				Username: "user",
				Password: "pass",
			},
			pb.LoginUserResponse{
				Token: "token",
				Error: "",
			},
		},
		{
			"Invalid credentials",
			pb.LoginUserRequest{
				Username: "user",
				Password: "invalid-password",
			},
			pb.LoginUserResponse{
				Token: "",
				Error: "failure",
			},
		},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			ctx := context.Background()
			conn, err := grpc.Dial("bufnet", grpc.WithDialer(bufDialer), grpc.WithInsecure())
			if err != nil {
				t.Fatalf("Failed to dial bufnet: %v", err)
			}
			defer conn.Close()

			client := pb.NewDaemonClient(conn)

			resp, _ := client.LoginUser(ctx, &c.req)
			if resp.Error != c.expected.Error {
				t.Fatalf("Expected error '%s', but got '%s'", c.expected.Error, resp.Error)
			}
			if resp.Token != c.expected.Token {
				t.Fatalf("Expected token '%s', but got '%s'", c.expected.Token, resp.Token)
			}
		})
	}
}