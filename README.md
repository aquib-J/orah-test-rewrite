# orah-test-rewrite

We can use 
node -version
v12.22.12 to install all the dependencies and run the repo.

The APIs have been prefixed with `/api/` which basically gives us the below endpoints to test out all the features

{{url}} => localhost:4001 (configurable through the .env file (env.sample file for referrence)


{{url}}/api/student/create -> to create a student

{{url}}/api/student/get-all -> to get a list of all the students

{{url}}/api/roll/create -> to create a roll entry

{{url}}/api/roll/add-student-states -> to dump bulk { student/roll/state }[] data for below endpoints to use

{{url}}/api/group/create -> create a group

{{url}}/api/group/get-all -> to get a list of all the groups

{{url}}/api/group/update/:id -> to update a particular group

{{url}}/api/group/:id -> to delete a particular group

{{url}}/api/group/get-students-in-group -> get all the students tagged by groups

{{url}}/api/group/run-group-filters -> to run the group filter on all the students and their rolls


The Architecture we've tried implementing here is sort of a layered architecture with influence from hexagonal/clean architecture as much as possible for the sake of tiem,
The most obvious advantage of using this approach is that each of the different layers can be easily swapped out without much problem and replaced with better or more
suited alternatives, like we can easily replace `Express` from the router layer and replace it with something else but our Domain logic and DataBases Infra and Domain/Business Entities
remain exactly where they are with maybe some little minor changes
between themselves 
