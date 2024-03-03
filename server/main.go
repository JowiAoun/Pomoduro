package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"time"
)

type userType struct {
	Id        string    `json:"id"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	Picture   string    `json:"picture"`
	DayStreak uint16    `json:"dayStreak"`
	Created   time.Time `json:"created"`
}

type taskType struct {
	Id          string    `json:"id"`
	UserId      string    `json:"userId"`
	Title       string    `json:"title"`
	Note        string    `json:"note"`
	ProjectName string    `json:"projectName"`
	Done        bool      `json:"done"`
	ActPomodoro uint8     `json:"actPomodoro"`
	EstPomodoro uint8     `json:"estPomodoro"`
	Created     time.Time `json:"created"`
}

var users = []userType{
	{
		Id:        "1",
		Username:  "user1",
		Email:     "user1@example.com",
		Picture:   "user1.jpg",
		DayStreak: 10,
		Created:   time.Now(),
	},
	{
		Id:        "2",
		Username:  "user2",
		Email:     "user2@example.com",
		Picture:   "user2.jpg",
		DayStreak: 5,
		Created:   time.Now(),
	},
	{
		Id:        "3",
		Username:  "user3",
		Email:     "user3@example.com",
		Picture:   "user3.jpg",
		DayStreak: 20,
		Created:   time.Now(),
	},
}

var tasks = []taskType{
	// Tasks for user 1
	{
		Id:          "1",
		UserId:      "1",
		Title:       "Task 1 for User 1",
		Note:        "This is task 1 for user 1",
		ProjectName: "Project 1",
		Done:        false,
		ActPomodoro: 0,
		EstPomodoro: 2,
		Created:     time.Now(),
	},
	// Tasks for user 2
	{
		Id:          "2",
		UserId:      "2",
		Title:       "Task 1 for User 2",
		Note:        "This is task 1 for user 2",
		ProjectName: "Project 2",
		Done:        false,
		ActPomodoro: 0,
		EstPomodoro: 3,
		Created:     time.Now(),
	},
	{
		Id:          "3",
		UserId:      "2",
		Title:       "Task 2 for User 2",
		Note:        "This is task 2 for user 2",
		ProjectName: "Project 2",
		Done:        false,
		ActPomodoro: 0,
		EstPomodoro: 4,
		Created:     time.Now(),
	},
	// Tasks for user 3
	{
		Id:          "4",
		UserId:      "3",
		Title:       "Task 1 for User 3",
		Note:        "This is task 1 for user 3",
		ProjectName: "Project 3",
		Done:        false,
		ActPomodoro: 0,
		EstPomodoro: 1,
		Created:     time.Now(),
	},
	{
		Id:          "5",
		UserId:      "3",
		Title:       "Task 2 for User 3",
		Note:        "This is task 2 for user 3",
		ProjectName: "Project 3",
		Done:        false,
		ActPomodoro: 0,
		EstPomodoro: 2,
		Created:     time.Now(),
	},
	{
		Id:          "6",
		UserId:      "3",
		Title:       "Task 3 for User 3",
		Note:        "This is task 3 for user 3",
		ProjectName: "Project 3",
		Done:        false,
		ActPomodoro: 0,
		EstPomodoro: 3,
		Created:     time.Now(),
	},
}

func main() {
	router := gin.Default()

	router.GET("api/user", getUser)
	router.POST("api/user", addUser)
	router.GET("api/users", getUsers)
	router.GET("api/tasks", getTasks)

	if err := router.Run("localhost:8080"); err != nil {
		return
	}
}

func getUser(c *gin.Context) {
	id := c.GetHeader("id")

	for _, user := range users {
		if user.Id == id {
			c.IndentedJSON(http.StatusOK, user)
			return
		}
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"success": false, "message": "Could not find user"})
}

func addUser(c *gin.Context) {
	var newUser userType
	if err := c.BindJSON(&newUser); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"success": false, "message": "Could not add user"})
		return
	}
	users = append(users, newUser)
	c.IndentedJSON(http.StatusOK, gin.H{"success": true})
}

func getUsers(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, users)
}

func getTasks(c *gin.Context) {
	userId := c.GetHeader("userId")
	var userTasks []taskType

	for _, task := range tasks {
		if task.UserId == userId {
			userTasks = append(userTasks, task)
		}
	}

	if len(userTasks) > 0 {
		c.IndentedJSON(http.StatusOK, userTasks)
	} else {
		c.IndentedJSON(http.StatusNotFound, gin.H{"success": false, "message": "Could not find tasks"})
	}
}
