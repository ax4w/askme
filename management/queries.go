package main

import (
	"crypto/sha256"
	"fmt"
	"os"

	"gorm.io/gorm"
)

var (
	db      *gorm.DB
	adminPW = os.Getenv("ADMIN_PW")
)

func passwordHash(password string) string {
	return fmt.Sprintf("%x", sha256.Sum256([]byte(password)))
}

func getUser(username string) (User, error) {
	var user User
	if err := db.Where("username = ?", username).First(&user).Error; err != nil {
		return User{}, err
	}
	return user, nil
}

func doesUserExist(username string) (bool, error) {
	var user User
	if err := db.Where("username = ?", username).First(&user).Error; err != nil {
		return false, err
	}
	return true, nil
}

func getKey(provider string) (Key, error) {
	var key Key
	if err := db.Where("provider = ?", provider).First(&key).Error; err != nil {
		return Key{}, err
	}
	return key, nil
}

func createUser(user User) error {
	return db.Create(&user).Error
}

func isAdmin(username string) bool {
	user, err := getUser(username)
	if err != nil {
		return false
	}
	return user.Admin
}

func doesAdminExist() bool {
	var user User
	if err := db.Where("admin = ?", true).First(&user).Error; err != nil {
		return false
	}
	return true
}
