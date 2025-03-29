package main

import (
	"fmt"
	"net/http"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func init() {
	var err error
	db, err = gorm.Open(sqlite.Open("/management-data/askme.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	db.AutoMigrate(&User{}, &Key{})
	exists := doesAdminExist()
	if !exists {
		fmt.Printf("Creating admin user with password: %s\n", adminPW)
		createUser(User{
			Username: "admin",
			Password: passwordHash(adminPW),
			Admin:    true,
		})
	}
}

func main() {
	http.Handle("/login", corsMiddleware(http.HandlerFunc(signInHandler)))
	http.Handle("/auth", corsMiddleware(authMiddleware(http.HandlerFunc(authHandler))))
	http.Handle("/get-available-models", corsMiddleware(authMiddleware(http.HandlerFunc(getAvailableModelsHandler))))
	http.Handle("/query-model", corsMiddleware(authMiddleware(http.HandlerFunc(queryModelHandler))))
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, World!")
	})
	if err := http.ListenAndServe(":6969", nil); err != nil {
		panic(err)
	}
}
