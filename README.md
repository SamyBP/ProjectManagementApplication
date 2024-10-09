# Project Management App

## Description

The application is designed to allow users to manage tasks and collaborate effectively.
Users can log in securely, create projects, and assign tasks to team members.
Project owners have full control over tasks, including setting priorities, deadlines, and updating assignments.
Contributors can easily track and manage their tasks, log working hours, and request deadline changes.

## User stories:

* As a user I can log in the app using my email (valid email structure) and password
* As a user I can create a new project and share it with my colleagues  
* Actions: task deadline | assigned | completion | update will trigger notifications
* As a Project Owner i can perform CRUD on the Tasks form the project (that I own)
    * I can add collegue to the project 
	* I can create a task and choose to assign it to a Employee / Collegue
	* When I create a task I can set a certain level of priority like: LOW | MEDIUM | HIGH, also I would like to set a deadline
	* I can see all tasks: ASSIGNED | IN_PROGRESS | FINSISHED | CLOSED
	* I can update a Task: ?like change collegue to a certain task?, change the priority, maybe move up/down the deadline
	* I can remove a Task from the project (maybe just soft deletion)
	* Archiving the project
	* Deleting the project
* As a Contributer to a project
	* I can browse through my tasks
	* I can log my working time
	* I can update a task status
	* I could posibly make a request to move up the deadline
