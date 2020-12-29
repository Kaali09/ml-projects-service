/**
 * name : userProjects.js
 * author : Aman
 * created-date : 20-July-2020
 * Description : User Projects related information.
 */

// Dependencies
const csv = require('csvtojson');
const userProjectsHelper = require(MODULES_BASE_PATH + "/userProjects/helper");

 /**
    * UserProjects
    * @class
*/

module.exports = class UserProjects extends Abstract {

    /**
     * @apiDefine errorBody
     * @apiError {String} status 4XX,5XX
     * @apiError {String} message Error
     */

    /**
     * @apiDefine successBody
     *  @apiSuccess {String} status 200
     * @apiSuccess {String} result Data
     */
    
    constructor() {
        super("projects");
    }

    static get name() {
        return "userProjects";
    }

    /**
    * @api {get} /improvement-project/api/v1/userProjects/list?updateLastDownloadedAt=:updateLastDownloadedAt
    * List of projects.
    * @apiVersion 1.0.0
    * @apiGroup User Projects
    * @apiSampleRequest /improvement-project/api/v1/userProjects/list?updateLastDownloadedAt=true
    * @apiParamExample {json} Response:
    * {
    "message": "Project lists fetched successfully",
    "status": 200,
    "result": [
        {
            "_id": "5f2449eb626a540f40817ef5",
            "userId": "e97b5582-471c-4649-8401-3cc4249359bb",
            "status": "pending",
            "createdAt": "2020-06-29T05:38:43.408Z",
            "lastDownloadedAt": "2020-06-29T05:38:43.408Z",
            "syncedAt": "2020-06-29T05:38:43.408Z",
            "isDeleted": false,
            "category": [
                "Community"
            ],
            "createdBy": "e97b5582-471c-4649-8401-3cc4249359bb",
            "startedAt": "2020-06-29T05:38:43.408Z",
            "completedAt": "2020-06-29T05:38:43.408Z",
            "tasks": [
                {
                    "_id": "5f24404784504944928b10bc",
                    "isDeleted": false,
                    "isDeleteable": false,
                    "taskSequence": [],
                    "children": [
                        {
                            "_id": "5f24404784504944928b10bd",
                            "createdBy": "e97b5582-471c-4649-8401-3cc4249359bb",
                            "updatedBy": "e97b5582-471c-4649-8401-3cc4249359bb",
                            "isDeleted": false,
                            "isDeleteable": false,
                            "taskSequence": [],
                            "children": [],
                            "deleted": false,
                            "type": "single",
                            "projectTemplateId": "5f2402f570d11462f8e9a591",
                            "name": "Sub-Task-4",
                            "externalId": "sub-task-4",
                            "description": "Sub Task-4-details",
                            "updatedAt": "2020-07-31T16:25:01.405Z",
                            "createdAt": "2020-07-31T16:01:11.286Z",
                            "__v": 0,
                            "parentId": "5f24404784504944928b10bc"
                        }
                    ],
                    "deleted": false,
                    "type": "multiple",
                    "projectTemplateId": "5f2402f570d11462f8e9a591",
                    "name": "Task-3",
                    "externalId": "Task-3",
                    "description": "Task-3details",
                    "updatedAt": "2020-07-31T16:25:01.430Z",
                    "createdAt": "2020-07-31T16:01:11.280Z"
                }
            ],
            "entityInformation": {
                "externalId": "1959076",
                "name": "Nigam Pratibha Vidyalaya (Girls), Jauna Pur, New Delhi"
            },
            "solutionInformation": {
                "externalId": "EF-DCPCR-2018-001",
                "name": "DCPCR Assessment Framework 2018",
                "description": "DCPCR Assessment Framework 2018",
                "_id": "5b98fa069f664f7e1ae7498c"
            },
            "entityTypeId": "5ce23d633c330302e720e65f",
            "programInformation": {
                "externalId": "PROGID01",
                "name": "DCPCR School Development Index 2018-19",
                "description": "DCPCR School Development Index 2018-19"
            },
            "title": "Improving Library",
            "goal": "Improving Library",
            "duration": "1 weeak"
        }
    ]
    } 
    * @apiUse successBody
    * @apiUse errorBody
    */

      /**
      * List of project
      * @method
      * @name list
      * @param {Object} req - request data.
      * @returns {JSON} returns a list of project.
     */

    async list(req) {
        return new Promise(async (resolve, reject) => {
            try {

                let projects = await userProjectsHelper.list(
                    req.userDetails.userInformation.userId,
                    req.query.updateLastDownloadedAt ? req.query.updateLastDownloadedAt : false
                );

                projects.result = projects.data;

                return resolve(projects);

            } catch (error) {
                return reject({
                    status: error.status || HTTP_STATUS_CODE.internal_server_error.status,
                    message: error.message || HTTP_STATUS_CODE.internal_server_error.message,
                    errorObject: error
                });
            }
        })
    }

      /**
    * @api {get} /improvement-project/api/v1/userProjects/metaForm 
    * Projects metaForm.
    * @apiVersion 1.0.0
    * @apiGroup User Projects
    * @apiSampleRequest /improvement-project/api/v1/userProjects/metaForm
    * @apiParamExample {json} Response:
    * {
    * "message": "Successfully fetched projects metaform",
    * "status": 200,
    * "result": [
        {
            "field": "title",
            "label": "Title",
            "value": "",
            "visible": true,
            "editable": true,
            "input": "text",
            "validation": {
                "required": true
            }
        },
        {
            "field": "description",
            "label": "Description",
            "value": "",
            "visible": true,
            "editable": true,
            "input": "textarea",
            "validation": {
                "required": true
            }
        },
        {
            "field": "categories",
            "label": "Categories",
            "value": "",
            "visible": true,
            "editable": true,
            "input": "select",
            "options": [
                {
                    "_id": "5fbb2bcc3e7f4958654e351e",
                    "label": "Teachers",
                    "value": "teachers"
                },
                {
                    "_id": "5fbb2bcc3e7f4958654e351f",
                    "label": "Students",
                    "value": "students"
                },
                {
                    "_id": "5fbb2bcc3e7f4958654e3520",
                    "label": "Infrastructure",
                    "value": "infrastructure"
                },
                {
                    "_id": "5fbb2bcc3e7f4958654e3521",
                    "label": "Community",
                    "value": "community"
                },
                {
                    "_id": "5fbb2bcc3e7f4958654e3522",
                    "label": "Education Leader",
                    "value": "educationLeader"
                },
                {
                    "_id": "",
                    "label": "Others",
                    "value": "others"
                }
            ],
            "validation": {
                "required": false
            }
        }]}
        * @apiUse successBody
        * @apiUse errorBody 
    */

      /**
      * Projects form
      * @method
      * @name metaForm
      * @param {Object} req - request data.
      * @returns {JSON} Projects form.
     */

    async metaForm(req) {
        return new Promise(async (resolve, reject) => {
            try {

                const formsData = 
                await userProjectsHelper.metaForm(req.userDetails.userToken);

                formsData.result = formsData.data;
                return resolve(formsData);

            } catch (error) {
                return reject({
                    status: error.status || HTTP_STATUS_CODE.internal_server_error.status,
                    message: error.message || HTTP_STATUS_CODE.internal_server_error.message,
                    errorObject: error
                });
            }
        })
    }

      /**
    * @api {get} /improvement-project/api/v1/userProjects/tasksMetaForm 
    * Projects task meta form.
    * @apiVersion 1.0.0
    * @apiGroup User Projects
    * @apiSampleRequest /improvement-project/api/v1/userProjects/tasksMetaForm
    * @apiParamExample {json} Response:
    * {
    "message": "Successfully fetched projects tasks metaform",
    "status": 200,
    "result": [
        {
            "field": "name",
            "label": "Name",
            "value": "",
            "visible": true,
            "editable": true,
            "input": "text",
            "validation": {
                "required": true
            }
        },
        {
            "field": "description",
            "label": "Description",
            "value": "",
            "visible": true,
            "editable": true,
            "input": "textarea",
            "validation": {
                "required": true
            }
        }
    ]
    }
    * @apiUse successBody
    * @apiUse errorBody
    */

      /**
      * Projects tasks meta form.
      * @method
      * @name tasksMetaForm
      * @param {Object} req - request data.
      * @returns {JSON} Projects tasks meta form.
     */

    async tasksMetaForm() {
        return new Promise(async (resolve, reject) => {
            try {

                let formsData = await userProjectsHelper.tasksMetaForm();

                formsData.result = formsData.data;
                return resolve(formsData);

            } catch (error) {
                return reject({
                    status: error.status || HTTP_STATUS_CODE.internal_server_error.status,
                    message: error.message || HTTP_STATUS_CODE.internal_server_error.message,
                    errorObject: error
                });
            }
        })
    }

     /**
    * @api {post} /improvement-project/api/v1/userProjects/bulkCreate 
    * Bulk create user projects.
    * @apiVersion 1.0.0
    * @apiGroup User Projects
    * @apiParam {File} projects Mandatory project file of type CSV.
    * @apiSampleRequest /improvement-project/api/v1/userProjects/bulkCreate
    * @apiUse successBody
    * @apiUse errorBody
    */

    /**
      * Bulk create user projects.
      * @method
      * @name bulkCreate
      * @param {Object} req - request data.
      * @returns {CSV} Assigned projects to user.
     */

    async bulkCreate(req) {
        return new Promise(async (resolve, reject) => {
            try {

                if ( !req.files || !req.files.projects ) {
                    return resolve(
                      {
                        status : HTTP_STATUS_CODE["bad_request"].status, 
                        message : CONSTANTS.apiResponses.PROJECTS_CSV_REQUIRED
                      }
                    )
                }

                const projectsData = await csv().fromString(
                    req.files.projects.data.toString()
                );

                const projects = await userProjectsHelper.bulkCreate(
                    projectsData,
                    req.userDetails.userToken
                );

                return resolve(projects);

            } catch (error) {
                return reject({
                    status: error.status || HTTP_STATUS_CODE.internal_server_error.status,
                    message: error.message || HTTP_STATUS_CODE.internal_server_error.message,
                    errorObject: error
                });
            }
        })
    }

     /**
    * @api {post} /improvement-project/api/v1/userProjects/importFromLibrary/:projectTemplateId 
    * Import project from library.
    * @apiVersion 1.0.0
    * @apiGroup User Projects
    * @apiSampleRequest /improvement-project/api/v1/userProjects/importFromLibrary/5f5b32cef16777642d51aaf0
    * @apiParamExample {json} Request:
    * {
    * "programId" : "",
    * "programName" : "My Program",
    * "rating" : 2
    * }
    * @apiParamExample {json} Response:
    * {
    "message": "Successfully fetched projects",
    "status": 200,
    "result": {
        "userId": "01c04166-a65e-4e92-a87b-a9e4194e771d",
        "createdFor": [],
        "isDeleted": false,
        "categories": [
            {
                "_id": "5f102331665bee6a740714eb",
                "externalId": "community",
                "name": "Community"
            }
        ],
        "createdBy": "01c04166-a65e-4e92-a87b-a9e4194e771d",
        "tasks": [
            {
                "_id": "61d6690d-82cb-4db2-8191-8dd945c5e742",
                "isDeleted": false,
                "isDeleteable": false,
                "taskSequence": [],
                "children": [
                    {
                        "_id": "b5068cef-eefc-4f43-8a29-ab9c2268f451",
                        "isDeleted": false,
                        "isDeleteable": false,
                        "taskSequence": [],
                        "children": [],
                        "visibleIf": [
                            {
                                "operator": "===",
                                "_id": "5f72f9998925ec7c60f79a91",
                                "value": "started"
                            }
                        ],
                        "deleted": false,
                        "type": "single",
                        "projectTemplateId": "5f5b32cef16777642d51aaf0",
                        "name": "Sub task 1",
                        "externalId": "Sub-task-1",
                        "description": "Sub-Task-1-Description",
                        "updatedAt": "2020-09-29T09:08:41.681Z",
                        "createdAt": "2020-09-29T09:08:41.675Z",
                        "__v": 0,
                        "status": "notStarted"
                    },
                    {
                        "_id": "988ef20f-267f-4bed-9a38-9d7dc6a320e9",
                        "isDeleted": false,
                        "isDeleteable": false,
                        "taskSequence": [],
                        "children": [],
                        "visibleIf": [
                            {
                                "operator": "===",
                                "_id": "5f72f9998925ec7c60f79a91",
                                "value": "started"
                            }
                        ],
                        "deleted": false,
                        "type": "single",
                        "projectTemplateId": "5f5b32cef16777642d51aaf0",
                        "name": "Sub task 2",
                        "externalId": "Sub-task-2",
                        "description": "Sub-Task-2-Description",
                        "updatedAt": "2020-09-29T09:08:41.693Z",
                        "createdAt": "2020-09-29T09:08:41.689Z",
                        "__v": 0,
                        "status": "notStarted"
                    }
                ],
                "visibleIf": [],
                "deleted": false,
                "type": "multiple",
                "projectTemplateId": "5f5b32cef16777642d51aaf0",
                "name": "Task 1",
                "externalId": "task-1",
                "description": "Task-1 Description",
                "updatedAt": "2020-09-29T09:08:41.691Z",
                "createdAt": "2020-09-29T09:08:41.612Z",
                "__v": 0,
                "status": "notStarted"
            },
            {
                "_id": "289d9558-b98f-41cf-81d3-92486f114a49",
                "isDeleted": false,
                "isDeleteable": false,
                "taskSequence": [],
                "children": [],
                "visibleIf": [],
                "deleted": false,
                "type": "single",
                "projectTemplateId": "5f5b32cef16777642d51aaf0",
                "name": "Task 12",
                "externalId": "Task-12",
                "description": "Task-1 Description",
                "updatedAt": "2020-09-29T09:08:41.667Z",
                "createdAt": "2020-09-29T09:08:41.667Z",
                "__v": 0,
                "status": "notStarted"
            }
        ],
        "updatedBy": "01c04166-a65e-4e92-a87b-a9e4194e771d",
        "rootOrganisations": [],
        "_id": "5f731d68920a8c3e092e6e4c",
        "deleted": false,
        "name": "Test-2",
        "description": "improving school library",
        "status": "notStarted",
        "updatedAt": "2020-09-29T11:41:28.656Z",
        "createdAt": "2020-09-11T08:18:22.077Z",
        "__v": 0,
        "solutionInformation": {
            "externalId": "01c04166-a65e-4e92-a87b-a9e4194e771d-1601379673400"
        },
        "programInformation": {
            "externalId": "My Program-1601379673400",
            "name": "My Program"
        },
        "taskReport": {},
        "entityInformation": {},
        "rationale": "sample",
        "primaryAudience": [
            "teachers",
            "head master"
        ]
    }}
    * @apiUse successBody
    * @apiUse errorBody
    */

    /**
      * Import project from library.
      * @method
      * @name importFromLibrary
      * @param {Object} req - request data.
      * @param {String} req.params._id - project Template Id.
      * @returns {JSON} import project from library.
     */

    async importFromLibrary(req) {
        return new Promise(async (resolve, reject) => {
            try {

                const createdProject = await userProjectsHelper.importFromLibrary(
                    req.params._id,
                    req.body,
                    req.userDetails.userToken,
                    req.userDetails.userInformation.userId
                );

                return resolve({
                    message: createdProject.message,
                    result: createdProject.data
                });

            } catch (error) {
                return reject({
                    status: error.status || HTTP_STATUS_CODE.internal_server_error.status,
                    message: error.message || HTTP_STATUS_CODE.internal_server_error.message,
                    errorObject: error
                });
            }
        })
    }

       /**
    * @api {get} /improvement-project/api/v1/userProjects/create
    * Create project.
    * @apiVersion 1.0.0
    * @apiGroup User Projects
    * @apiSampleRequest /improvement-project/api/v1/userProjects/create
    * @apiParamExample {json} Response:
    * {
    "message": "Created user project successfully",
    "status": 200,
    "result": {
        "_id": "5f97d2f6bf3a3b1c0116c80a",
        "lastDownloadedAt": "2020-10-27T07:57:41.003Z"
    }}
    * @apiUse successBody
    * @apiUse errorBody
    */

    /**
      * Create project.
      * @method
      * @name create
      * @param {Object} req - request data.
      * @param {String} req.params._id - Project id.
      * @returns {JSON} Create project.
     */

    async create(req) {
        return new Promise(async (resolve, reject) => {
            try {

                let createdProject = await userProjectsHelper.create(
                    req.userDetails.userInformation.userId,
                    req.userDetails.userToken
                );

                createdProject.result = createdProject.data;

                return resolve(createdProject);

            } catch (error) {
                return reject({
                    status: error.status || HTTP_STATUS_CODE.internal_server_error.status,
                    message: error.message || HTTP_STATUS_CODE.internal_server_error.message,
                    errorObject: error
                });
            }
        })
    }

     /**
    * @api {post} /improvement-project/api/v1/userProjects/sync/:projectId?lastDownloadedAt=:epochTime 
    * Sync project.
    * @apiVersion 1.0.0
    * @apiGroup User Projects
    * @apiSampleRequest /improvement-project/api/v1/userProjects/sync/5f731631e8d7cd3b88ac0659?lastDownloadedAt=0125747659358699520
    * @apiParamExample {json} Request:
    * {
    "title": "Project 1",
    "description": "Project 1 description",
    "tasks": [
        {
            "_id": "289d9558-b98f-41cf-81d3-92486f114a49",
            "name": "Task 1",
            "description": "Task 1 description",
            "status": "notStarted/inProgress/completed",
            "isACustomTask": false,
            "startDate": "2020-09-29T09:08:41.667Z",
            "endDate": "2020-09-29T09:08:41.667Z",
            "lastModifiedAt": "2020-09-29T09:08:41.667Z",
            "type": "single/multiple",
            “isDeleted” : false,
             “attachments” : [
               {
                 "name" : "download(2).jpeg",
                 "type" : "image/jpeg",
                  "sourcePath" : "projectId/userId/imageName"
               }
             ],
             “remarks” : “Tasks completed”,
             “assignee” : “Aman”,
            "children": [
                {
                    "_id": "289d9558-b98f-41cf-81d3-92486f114a50",
                    "name": "Task 2",
                    "description": "Task 2 description",
                    "status": "notStarted/inProgress/completed",
                    "children": [],
                    "isACustomTask": false,
                    "startDate": "2020-09-29T09:08:41.667Z",
                    "endDate": "2020-09-29T09:08:41.667Z",
                    "lastModifiedAt": "2020-09-29T09:08:41.667Z",
                    "type": "single/multiple”,
                    “isDeleted” : false
                }
            ]
        }
    ],
    "programId": "",
    "programName": "New Project Program",
    "entityId" : “5beaa888af0065f0e0a10515”,
    "categories": [
        {
            "value": "5f102331665bee6a740714e8",
            "label": "teacher"
        },
        {
            "value": "",
            "label": "other"
        }
    ],
    "status": "notStarted/inProgress/completed",
    “lastDownloadedAt” : "2020-09-29T09:08:41.667Z",
    "payload": {
        "_id": "289d9558-b98f-41cf-81d3-92486f114a51"
    }}
    * @apiParamExample {json} Response:
    * {
    * "message": "Project updated successfully",
    * "status": 200,
    * "result" : {
    *   "programId" : "5fb669f223575a2f0cef3b33"
    * }
    * }
    * @apiUse successBody
    * @apiUse errorBody
    */

    /**
      * Sync projects.
      * @method
      * @name sync
      * @param {Object} req - request data.
      * @param {String} req.params._id - Project id.
      * @returns {JSON} Create Self projects.
     */

    async sync(req) {
        return new Promise(async (resolve, reject) => {
            try {

                let createdProject = await userProjectsHelper.sync(
                    req.params._id,
                    req.query.lastDownloadedAt,
                    req.body,
                    req.userDetails.userInformation.userId,
                    req.userDetails.userToken
                );

                createdProject.result = createdProject.data;

                return resolve(createdProject);

            } catch (error) {
                return reject({
                    status: error.status || HTTP_STATUS_CODE.internal_server_error.status,
                    message: error.message || HTTP_STATUS_CODE.internal_server_error.message,
                    errorObject: error
                });
            }
        })
    }

      /**
    * @api {get} /improvement-project/api/v1/userProjects/details/:projectId
    * Project Details.
    * @apiVersion 1.0.0
    * @apiGroup User Projects
    * @apiSampleRequest /improvement-project/api/v1/userProjects/details/5f731631e8d7cd3b88ac0659
    * @apiParamExample {json} Response:
    * {
    "message": "Successfully fetched project details",
    "status": 200,
    "result": {
        "_id": "5f97d2f6bf3a3b1c0116c80a",
        "status": "notStarted",
        "isDeleted": false,
        "categories": [
            {
                "_id": "5f102331665bee6a740714e8",
                "name": "Teachers",
                "externalId": "teachers"
            },
            {
                "name": "newCategory",
                "externalId": "",
                "_id": ""
            }
        ],
        "tasks": [
            {
                "_id": "289d9558-b98f-41cf-81d3-92486f114a49",
                "name": "Task 1",
                "description": "Task 1 description",
                "status": "notStarted",
                "isACustomTask": false,
                "startDate": "2020-09-29T09:08:41.667Z",
                "endDate": "2020-09-29T09:08:41.667Z",
                "lastModifiedAt": "2020-09-29T09:08:41.667Z",
                "type": "single",
                "isDeleted": false,
                "attachments": [
                    {
                        "name": "download(2).jpeg",
                        "type": "image/jpeg",
                        "sourcePath": "projectId/userId/imageName"
                    }
                ],
                "remarks": "Tasks completed",
                "assignee": "Aman",
                "children": [
                    {
                        "_id": "289d9558-b98f-41cf-81d3-92486f114a50",
                        "name": "Task 2",
                        "description": "Task 2 description",
                        "status": "notStarted",
                        "children": [],
                        "isACustomTask": false,
                        "startDate": "2020-09-29T09:08:41.667Z",
                        "endDate": "2020-09-29T09:08:41.667Z",
                        "lastModifiedAt": "2020-09-29T09:08:41.667Z",
                        "type": "single",
                        "isDeleted": false,
                        "externalId": "task 2",
                        "isDeleteable": false,
                        "createdAt": "2020-10-28T05:58:24.907Z",
                        "updatedAt": "2020-10-28T05:58:24.907Z",
                        "isImportedFromLibrary": false
                    }
                ],
                "externalId": "task 1",
                "isDeleteable": false,
                "createdAt": "2020-10-28T05:58:24.907Z",
                "updatedAt": "2020-10-28T05:58:24.907Z",
                "isImportedFromLibrary": false
            }
        ],
        "resources": [],
        "deleted": false,
        "lastDownloadedAt": "2020-09-29T09:08:41.667Z",
        "__v": 0,
        "description": "Project 1 description"
    }
    }
    * @apiUse successBody
    * @apiUse errorBody
    */

    /**
      * Project details
      * @method
      * @name details
      * @param {Object} req - request data.
      * @param {String} req.params._id - Project id.
      * @returns {JSON} Create Self projects.
     */

    async details(req) {
        return new Promise(async (resolve, reject) => {
            try {

                let projectDetails = await userProjectsHelper.details(
                    req.params._id,
                    req.userDetails.userInformation.userId
                );

                projectDetails.result = projectDetails.data;

                return resolve(projectDetails);

            } catch (error) {
                return reject({
                    status: error.status || HTTP_STATUS_CODE.internal_server_error.status,
                    message: error.message || HTTP_STATUS_CODE.internal_server_error.message,
                    errorObject: error
                });
            }
        })
    }


    /**
    * @api {POST} /improvement-project/api/v1/userProjects/getFileUploadUrl getFileUploadUrl
    * Get file upload urls
    * @apiVersion 1.0.0
    * @apiGroup User Projects
    * @apiSampleRequest /improvement-project/api/v1/userProjects/getFileUploadUrl
    * @apiParamExample {json} Request:
    * {
        "5f72f9998925ec7c60f79a91": {
            "images": ["uploadFile.jpg", "uploadFile2.jpg"]
        }
      }
    * @apiParamExample {json} Response:
    * {
        "message": "File upload urls generated successfully.",
        "status": 200,
        "result": {
            "5f72f9998925ec7c60f79a91": {
                "images": [
                    {
                        "file": "uploadFile.jpg",
                        "url": "https://storage.googleapis.com/sl-dev-storage/01c04166-a65e-4e92-a87b-a9e4194e771d/5f72f9998925ec7c60f79a91/cd6763c9-a64a-4241-9907-4365970e8d11_uploadFile.jpg?GoogleAccessId=sl-dev-storage%40shikshalokam.iam.gserviceaccount.com&Expires=1605698490&Signature=ej6WHNOyx6EvUbAi81pDcYb3YqM7dkAhNT1Ktsf%2FTiRhwL%2ByhS89E1zRspIYlVOutlzoZXgRAl%2Fd0y%2BQcdryWYgfVAKAZmJVZtK3oVisLxhkFCKYeHAbzZ%2FadkCXdU3e1AVJGyRvKoN04Yr84%2BIa%2F1ApszOYDmVT%2Fn%2FOi4JSScbvzhe82bSe5xEr%2FPDwDq48%2FKgUhAc0faP%2FlAA2Wf7V1Ifuxc3quw9OpzvND8CKuugXZ%2FDZ6mhF0O80IXwP%2BFJOn4u9ydHqwXM3zDRDOO0WMh6VBLuvRFBRwJsrJG3v5zZMw0r5cYOIvkW4Tqo%2FefpXUDsvCVBTlZ9zBEdwx2Jshw%3D%3D",
                        "payload": {
                            "sourcePath": "01c04166-a65e-4e92-a87b-a9e4194e771d/5f72f9998925ec7c60f79a91/cd6763c9-a64a-4241-9907-4365970e8d11_uploadFile.jpg"
                        },
                        "cloudStorage": "GC"
                    },
                    {
                        "file": "uploadFile2.jpg",
                        "url": "https://storage.googleapis.com/sl-dev-storage/01c04166-a65e-4e92-a87b-a9e4194e771d/5f72f9998925ec7c60f79a91/1626ec00-f890-4f8b-9594-4342868e8703_uploadFile2.jpg?GoogleAccessId=sl-dev-storage%40shikshalokam.iam.gserviceaccount.com&Expires=1605698490&Signature=RucBanx70czWdcqNb5R3wTtATUCGl7BH6vUbx6GJqJJnxvVF179XLCgPHUcsv9eXNv9o0ptueFwA%2BHTAOA4d7g6tx2G7BYqua1zMsGIw5%2B57dUaIRfgXQgO%2Br5voQvKMDmSUJMx9nVY0Dfe5xce3xbcn4XjtQKopb%2Fjh1YqnCmnK7EujbU2tfk0ENBKHtEyd%2FdZlpCtQ7IqnZ%2FZJ73OZgX%2FjnFd18iJ2ce7%2FJ%2FwjUBUQnTBLPk7n%2FMFDkLfNMeSYlutwkwcApLj9cuLO%2FbmuEfT%2Fa%2BxzJz1xF639piOpTW6vAFHgXJz%2FLtR9nMUidMTOnhZdhTjjr%2BFiokqK03SGNw%3D%3D",
                        "payload": {
                            "sourcePath": "01c04166-a65e-4e92-a87b-a9e4194e771d/5f72f9998925ec7c60f79a91/1626ec00-f890-4f8b-9594-4342868e8703_uploadFile2.jpg"
                        },
                        "cloudStorage": "GC"
                    }
                ]
            }
        }
    }
    * @apiUse successBody
    * @apiUse errorBody
    */
    

 /**
 * Get file upload urls
 * @name getFileUploadUrl
 * @param {*} req 
 *  api is to get getFileUploadUrl Urls of files
 * @returns {JSON} returns file upload url.
 */

    async getFileUploadUrl(req) {
        return new Promise(async (resolve, reject) => {
            try {

                const fileUploadUrls = await userProjectsHelper.getFileUploadUrl(
                    req.body,
                    req.userDetails.userInformation.userId
                );
                return resolve({
                    message: fileUploadUrls.message,
                    result: fileUploadUrls.data
                });

            } catch (error) {
                return reject({
                    status: error.status || HTTP_STATUS_CODE.internal_server_error.status,
                    message: error.message || HTTP_STATUS_CODE.internal_server_error.message,
                    errorObject: error
                });
            }
        })
    }

   /**
    * @api {post} /improvement-project/api/v1/userProjects/tasksStatus/:projectId
    * User Project tasks status
    * @apiVersion 1.0.0
    * @apiGroup User Projects
    * @apiSampleRequest /improvement-project/api/v1/userProjects/tasksStatus/5f731631e8d7cd3b88ac0659
    * @apiParamExample {json} Request:
    * {
    *   "taskIds" : [
           "2f2ef6dd-24e9-40ab-a681-3b3167fcd2c6",
           "a18ae088-fa11-4ff4-899f-213abefb30f6"
       ]
     }
    * @apiParamExample {json} Response:
    {
    "message": "Tasks status fetched successfully",
    "status": 200,
    "result": [
        {
            "type": "assessment",
            "status": "started",
            "_id": "2f2ef6dd-24e9-40ab-a681-3b3167fcd2c6"
        },
        {
            "type": "observation",
            "status": "started",
            "_id": "a18ae088-fa11-4ff4-899f-213abefb30f6",
            "submissionId": "5fbaa71d97ccef111cbb4ee0"
        }
    ]
    }
    * @apiUse successBody
    * @apiUse errorBody
    */

    /**
      * Tasks status
      * @method
      * @name tasksStatus
      * @param {Object} req - request data.
      * @param {String} req.params._id - Project id.
      * @returns {JSON} status of tasks
     */
    
    async tasksStatus(req) {
        return new Promise(async (resolve, reject) => {
            try {

                let taskStatus = await userProjectsHelper.tasksStatus(
                    req.params._id,
                    req.body.taskIds
                );

                taskStatus.result = taskStatus.data;
                
                return resolve(taskStatus);

            } catch (error) {
                return reject({
                    status: error.status || HTTP_STATUS_CODE.internal_server_error.status,
                    message: error.message || HTTP_STATUS_CODE.internal_server_error.message,
                    errorObject: error
                });
            }
        })
    }

     /**
    * @api {get} /improvement-project/api/v1/userProjects/solutionDetails/:projectId?taskId=:taskId
    * User project solution details
    * @apiVersion 1.0.0
    * @apiGroup User Projects
    * @apiSampleRequest /improvement-project/api/v1/userProjects/solutionDetails/5fba54dc5bf46b25a926bee5?taskId=347400e7-8a62-4dad-bc24-af7c5bd70ad1
    * @apiParamExample {json} Response:
    * {
    "message" : "Solutions details fetched successfully",
    "status": 200,
    "result": {
        "entityId": "5beaa888af0065f0e0a10515",
        "programId": "5fba54dc2a1f7b172f066597",
        "observationId": "5d1a002d2dfd8135bc8e1617",
        "solutionId": "5d15b0d7463d3a6961f91749"
    }
    }
    * @apiUse successBody
    * @apiUse errorBody
    */

    /**
      * Solutions details information.
      * @method
      * @name status
      * @param {Object} req - request data.
      * @param {String} req.params._id - Project id.
      * @param {String} req.query.taskId - task id.
      * @returns {JSON} Solutions details
     */
    
    async solutionDetails(req) {
        return new Promise(async (resolve, reject) => {
            try {

                let solutionDetails = await userProjectsHelper.solutionDetails(
                    req.userDetails.userToken,
                    req.params._id,
                    req.query.taskId
                );

                solutionDetails.result = solutionDetails.data;
                
                return resolve(solutionDetails);

            } catch (error) {
                return reject({
                    status: error.status || HTTP_STATUS_CODE.internal_server_error.status,
                    message: error.message || HTTP_STATUS_CODE.internal_server_error.message,
                    errorObject: error
                });
            }
        })
    }


      /**
    * @api {post} /improvement-project/api/v1/userProjects/bulkCreateByUserRoleAndEntity 
    * Bulk create user projects by entity and role.
    * @apiVersion 1.0.0
    * @apiGroup User Projects
    * @apiSampleRequest /improvement-project/api/v1/userProjects/bulkCreateByUserRoleAndEntity
    * @apiParamExample {json} Request:
    * {
    *  "templateId": "5f2449eb626a540f40817ef5",
    *  "entityId": "5f2449eb626a540f40817ef5",
    *  "role": "CRP",
    *  "programExternalId": "TAF-pgm",
    *  "solutionExternalId": "TAF-solution"
     }
    * @apiUse successBody
    * @apiUse errorBody
    */

    /**
      * Bulk create user projects by entity and role.
      * @method
      * @name bulkCreateByUserRoleAndEntity
      * @param {Object} req - request data.
      * @param {String} req.body.entityId - entityId 
      * @param {String} req.body.role - role 
      * @returns {CSV} Assigned projects to user.
     */

    async bulkCreateByUserRoleAndEntity(req) {
        return new Promise(async (resolve, reject) => {
            try {

                let projects = await userProjectsHelper.bulkCreateByUserRoleAndEntity(
                    req.body,
                    req.userDetails.userToken
                );

                return resolve(projects);

            } catch (error) {
                return reject({
                    status: error.status || HTTP_STATUS_CODE.internal_server_error.status,
                    message: error.message || HTTP_STATUS_CODE.internal_server_error.message,
                    errorObject: error
                });
            }
        })
    }

      /**
    * @api {post} /improvement-project/api/v1/userProjects/getProject?page=:page&limit=:limit&search=:search
    * List of User projects and targetted ones.
    * @apiVersion 1.0.0
    * @apiGroup User Projects
    * @apiSampleRequest /improvement-project/api/v1/userProjects/getProject
    * @apiParamExample {json} Request:
    * {
    *   "role" : "HM",
   		"state" : "5c0bbab881bdbe330655da7f",
   		"block" : "5c0bbab881bdbe330655da7f",
   		"cluster" : "5c0bbab881bdbe330655da7f",
   		"school" : "5c0bbab881bdbe330655da7f"
    }
    * @apiParamExample {json} Response:
    * @apiUse successBody
    * @apiUse errorBody
    */

    /**
      * List of user projects and targetted ones.
      * @method
      * @name getProject
      * @param {Object} req - request data.
      * @returns {JSON} List of user project with targetted ones.
     */
    
    async getProject(req) {
        return new Promise(async (resolve, reject) => {
            try {

                let projects = await userProjectsHelper.getProject(
                    req.body,
                    req.userDetails.userInformation.userId,
                    req.userDetails.userToken,
                    req.pageSize,
                    req.pageNo,
                    req.searchText
                );

                projects.result = projects.data;
                
                return resolve(projects);

            } catch (error) {
                return reject({
                    status: error.status || HTTP_STATUS_CODE.internal_server_error.status,
                    message: error.message || HTTP_STATUS_CODE.internal_server_error.message,
                    errorObject: error
                });
            }
        })
    }

};