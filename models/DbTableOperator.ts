import * as sql  from 'mssql';
import { reject, resolve } from "promise";
import { Context } from "@azure/functions";
import configDb from '../config/conf'; 

export class DbTableOperator {
    private context:Context = null;
    private pool:Promise<sql.ConnectionPool> = sql.connect(configDb);

    constructor() {

    }

    public getAccountFundingDetails():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intAccountFundingDetailID, chvAccountFundingDetail, FORMAT(dteAccountFundingDetailModified, 'dd-MMM-yyyy') AS dteAccountFundingDetailModified FROM tlkpAccountFundingDetails ORDER BY chvAccountFundingDetail;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });

    }

    /**
     * Update or Insert a new record in tlkpAccountFundingDetails table
     * @param intAccountFundingDetailID 0 value for a new record else update a new record
     * @param chvAccountFundingDetail string account funding detail
     * @returns boolean true for successful operation
     */
    public upsertAccountFundingDetail(intAccountFundingDetailID=0, chvAccountFundingDetail=''):Promise<boolean> {
        return new Promise((resolve, reject) => {
            // check input
            if (chvAccountFundingDetail == null || chvAccountFundingDetail.trim().length == 0) {
                reject('Invalid account funding detail');
                return;
            }
            if (!Number.isInteger(intAccountFundingDetailID)) {
                reject('Invalid account funding detail ID');
                return;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intAccountFundingDetailID', sql.Int, intAccountFundingDetailID);
            queryRequest.input('chvAccountFundingDetail', sql.NVarChar, chvAccountFundingDetail);

            this.pool.then(() => {
                return queryRequest.execute('spUpsertAccountFundingDetail');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getAccountFundingEventTypes():Promise<Array<Object>> {
        return new Promise((resolve, reject) => {
            let query = `SELECT intAccountFundingTypeID, chvAccountFundingType, chvScheduledEventTypeIDs, chvScheduledEventTypes FROM vwAccountFundingEventTypesConcat;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * Update/create a new record in tlkpAccountFundingTypes
     * @param intAccountFundingTypeID 0 value for a new record else update a new record
     * @param chvAccountFundingType string account funding type data
     * @returns boolean true for success
     */
    public upsertAccountFundingType(intAccountFundingTypeID=0, chvAccountFundingType=''):Promise<boolean>{
        return new Promise((resolve, reject) => {
            // check input
            if (chvAccountFundingType == null || chvAccountFundingType.trim().length == 0) {
                reject('Invalid Account Funding Type Information');
                return;
            }
            if (!Number.isInteger(intAccountFundingTypeID)) {
                reject('Invalid account funding type ID');
                return;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intAccountFundingTypeID', sql.Int, intAccountFundingTypeID);
            queryRequest.input('chvAccountFundingType', sql.NVarChar, chvAccountFundingType);

            this.pool.then(() => {
                return queryRequest.execute('spUpsertAccountFundingType');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }    

    public getAccountFundingTypes():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intAccountFundingTypeID, chvAccountFundingType, FORMAT(dteAccountFundingTypeModified, 'dd-MMM-yyyy') AS dteAccountFundingTypeModified FROM tlkpAccountFundingTypes ORDER BY chvAccountFundingType;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    public getAccountPaymentTypes():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intAccountPaymentTypeID, chvAccountPaymentType, FORMAT(dteAccountPaymentTypeModified, 'dd-MMM-yyyy') AS dteAccountPaymentTypeModified FROM tlkpAccountPaymentTypes ORDER BY chvAccountPaymentType;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * Update/create a new record in tlkpAccountPaymentTypes
     * @param intAccountPaymentTypeID 0 value for a new record else update a new record
     * @param chvAccountPaymentType string account payment type data
     * @returns boolean true for success
     */
    public upsertAccountPaymentType(intAccountPaymentTypeID=0, chvAccountPaymentType=''):Promise<boolean>{
        return new Promise((resolve, reject) => {
            // check input
            if (chvAccountPaymentType == null || chvAccountPaymentType.trim().length == 0) {
                reject('Invalid Account Payment Type Information');
                return;
            }
            if (!Number.isInteger(intAccountPaymentTypeID)) {
                reject('Invalid account payment type ID');
                return;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intAccountPaymentTypeID', sql.Int, intAccountPaymentTypeID);
            queryRequest.input('chvAccountPaymentType', sql.NVarChar, chvAccountPaymentType);

            this.pool.then(() => {
                return queryRequest.execute('spUpsertAccountPaymentType');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });

        });
    }

    public getApplicationRequirements():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intApplicationRequirementID, chvApplicationRequirement, FORMAT(dteApplicationRequirementModified, 'dd-MMM-yyyy') AS dteApplicationRequirementModified FROM tlkpApplicationRequirements ORDER BY chvApplicationRequirement;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * Update/Insert record in tlkpApplicationRequirements table
     * @param intApplicationRequirementID 0 value for update, create new record otherwise
     * @param chvApplicationRequirement string data value for application requirement data
     * @returns boolea true for successful operation
     */
    public upsertApplicationRequirement(intApplicationRequirementID=0, chvApplicationRequirement=''):Promise<boolean>{
        return new Promise((resolve, reject) => {
            // check input
            if (chvApplicationRequirement == null || chvApplicationRequirement.trim().length == 0) {
                reject('Invalid application requirement information');
                return;
            }
            if (!Number.isInteger(intApplicationRequirementID)) {
                reject('Invalid application requirement id');
                return;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intApplicationRequirementID', sql.Int, intApplicationRequirementID);
            queryRequest.input('chvApplicationRequirement', sql.NVarChar, chvApplicationRequirement);

            this.pool.then(() => {
                return queryRequest.execute('spUpsertApplicationRequirement');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }


    public getApplicationStatus():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intApplicationStatusID, chvApplicationStatus, FORMAT(dteApplicationStatusModified, 'dd-MMM-yyyy') AS dteApplicationStatusModified FROM tlkpApplicationStatus ORDER BY chvApplicationStatus;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * Update/Insert record in tlkpApplicationStatus
     * @param intApplicationStatusID 0 for update, insert otherwise
     * @param chvApplicationStatus string application status information
     * @returns boolean true for successful operation
     */
    public upsertApplicationStatus(intApplicationStatusID=0, chvApplicationStatus=''):Promise<boolean>{
        return new Promise((resolve, reject) => {
            // check input
            if (chvApplicationStatus == null || chvApplicationStatus.trim().length == 0) {
                reject('Invalid application status information');
                return;
            }
            if (!Number.isInteger(intApplicationStatusID)) {
                reject('Invalid application status id');
                return;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intApplicationStatusID', sql.Int, intApplicationStatusID);
            queryRequest.input('chvApplicationStatus', sql.NVarChar, chvApplicationStatus);

            this.pool.then(() => {
                return queryRequest.execute('spUpsertApplicationStatus');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getAssessmentCategories():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intAssessmentCategoryID, chvAssessmentCategory, FORMAT(dteAssessmentCategoryModified, 'dd-MMM-yyyy') AS dteAssessmentCategoryModified FROM tlkpAssessmentCategories ORDER BY chvAssessmentCategory;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * Create/Update record in tlkpAssessmentCategories database table
     * @param intAssessmentCategoryID 0 for new record, else update a record
     * @param chvAssessmentCategory string assessment category information
     * @returns boolean true for a successful operation
     */
    public upsertAssessmentCategory(intAssessmentCategoryID=0, chvAssessmentCategory=''):Promise<boolean>{
        return new Promise((resolve, reject) => {
            // check input
            if (chvAssessmentCategory == null || chvAssessmentCategory.trim().length == 0) {
                reject('Invalid assessment category information');
                return;
            }
            if (!Number.isInteger(intAssessmentCategoryID)) {
                reject('Invalid assessment category id');
                return;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intAssessmentCategoryID', sql.Int, intAssessmentCategoryID);
            queryRequest.input('chvAssessmentCategory', sql.NVarChar, chvAssessmentCategory);

            this.pool.then(() => {
                return queryRequest.execute('spUpsertAssessmentCategory');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getSchemaTables():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intTableID,chvTableName,chvTableDisplayName,chvTableDescription,intTableIsVisible,chvTableIsVisible,intTableIsEditable,chvTableIsEditable,FORMAT(dteCreated, 'dd-MMM-yyyy') AS dteCreated,FORMAT(dteModified, 'dd-MMM-yyyy') AS dteModified FROM dbo.vwSchemaTables;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    public getAssessmentCategoryTypes():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intAssessmentCategoryTypeID, chvAssessmentCategoryType, FORMAT(dteAssessmentCategoryTypeModified, 'dd-MMM-yyyy') AS dteAssessmentCategoryTypeModified FROM tlkpAssessmentCategoryTypes ORDER BY chvAssessmentCategoryType;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * Insert/Update a record in tlkpAssessmentCategoryTypes table
     * @param intAssessmentCategoryTypeID 0 for a new record, update record otherwise
     * @param chvAssessmentCategoryType string data for assessment category type
     * @returns boolean true for successful operation
     */
    public upsertAssessmentCategoryType(intAssessmentCategoryTypeID=0, chvAssessmentCategoryType=''):Promise<boolean>{
        return new Promise((resolve, reject) => {
            // check input
            if (chvAssessmentCategoryType == null || chvAssessmentCategoryType.trim().length == 0) {
                reject('Invalid assessment category type information');
                return;
            }
            if (!Number.isInteger(intAssessmentCategoryTypeID)) {
                reject('Invalid assessment category type id');
                return;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intAssessmentCategoryTypeID', sql.Int, intAssessmentCategoryTypeID);
            queryRequest.input('chvAssessmentCategoryType', sql.NVarChar, chvAssessmentCategoryType);

            this.pool.then(() => {
                return queryRequest.execute('spUpsertAssessmentCategoryType');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getAssessmentChoiceOptions():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intAssessmentChoiceOptionID, chvAssessmentChoiceOption, FORMAT(dteAssessmentChoiceOptionModified, 'dd-MMM-yyyy') AS dteAssessmentChoiceOptionModified FROM tlkpAssessmentChoiceOptions ORDER BY chvAssessmentChoiceOption;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * Insert/Modify record in database table tlkpAssessmentChoiceOptions
     * @param intAssessmentChoiceOptionID 0 for new record, otherwise modify existing record
     * @param chvAssessmentChoiceOption string data for assessment option
     * @returns boolean true for a successful operation
     */
    public upsertAssessmentChoiceOption(intAssessmentChoiceOptionID = 0, chvAssessmentChoiceOption=''):Promise<boolean>{
        return new Promise((resolve, reject) => {
            // check input
            if (chvAssessmentChoiceOption == null || chvAssessmentChoiceOption.trim().length == 0) {
                reject('Invalid assessment choice option information');
                return;
            }
            if (!Number.isInteger(intAssessmentChoiceOptionID)) {
                reject('Invalid assessment category type id');
                return;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intAssessmentChoiceOptionID', sql.Int, intAssessmentChoiceOptionID);
            queryRequest.input('chvAssessmentChoiceOption', sql.NVarChar, chvAssessmentChoiceOption);

            this.pool.then(() => {
                return queryRequest.execute('spUpsertAssessmentChoiceOption');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getAssessmentChoices():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intAssessmentChoiceID, chvAssessmentChoice, FORMAT(dteAssessmentChoiceModified, 'dd-MMM-yyyy') AS dteAssessmentChoiceModified FROM tlkpAssessmentChoices ORDER BY chvAssessmentChoice;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * Create/Modify existing database record in tlkpAssessmentChoices 
     * @param intAssessmentChoiceID 0 for a new record otherwise modify existing record
     * @param chvAssessmentChoice string assessment choice option
     * @returns boolean true for a successful operation
     */
    public upsertAssessmentChoice(intAssessmentChoiceID=0, chvAssessmentChoice=''):Promise<boolean>{
        return new Promise((resolve, reject) => {
            // check input
            if (chvAssessmentChoice == null || chvAssessmentChoice.trim().length == 0) {
                reject('Invalid assessment choice option information');
                return;
            }
            if (!Number.isInteger(intAssessmentChoiceID)) {
                reject('Invalid assessment category type id');
                return;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intAssessmentChoiceID', sql.Int, intAssessmentChoiceID);
            queryRequest.input('chvAssessmentChoice', sql.NVarChar, chvAssessmentChoice);

            this.pool.then(() => {
                return queryRequest.execute('spUpsertAssessmentChoice');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getAssessmentSchemaDetails():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT	intAssessmentSchemaDetailID, intTableID, chvTableName, chvTableDisplayName, intColumnID, chvColumnName, chvSelectStoredProcedure, chvUpsertStoredProcedure, chvProfilePage, intAssessmentSchemaDetailModifiedByID, chvAssessmentSchemaDetailModifiedBy, chvAssessmentSchemaDetailModifiedByUniqueCode, FORMAT(dteAssessmentSchemaDetailModified, 'dd-MMM-yyyy') AS dteAssessmentSchemaDetailModified FROM vwAssessmentSchemaDetails ORDER BY chvTableDisplayName;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * CREATE/UPDATE records in tblAssessmentSchemaDetails database table
     * @param intAssessmentSchemaDetailID unique id, 0 for new record, otherwise update existing record 
     * @param intTableID integer value for the targeted table in the existing database
     * @param intColumnID integer value of the targeted column for the table
     * @param chvSelectStoredProcedure stored procedure name for selecting the data
     * @param chvUpsertStoredProcedure  stored procedure for inserting data
     * @param chvProfilePage string data for profile name
     * @param intPersonID  integer value of the person inserting/modifying the record
     * @returns boolean true for a successful operation
     */
    public upsertAssessmentSchemaDetails(intAssessmentSchemaDetailID = 0,
        intTableID = 0,
        intColumnID = 0,
        chvSelectStoredProcedure='',
        chvUpsertStoredProcedure='',
        chvProfilePage='',
        intPersonID=0):Promise<boolean> {
            return new Promise((resolve, reject) => {
                // check input
                if (chvSelectStoredProcedure == null || chvSelectStoredProcedure.trim().length == 0) {
                    reject('Invalid select stored procedure information');
                    return;
                }
                if (chvUpsertStoredProcedure == null || chvUpsertStoredProcedure.trim().length == 0) {
                    reject('Invalid upsert stored procedure information');
                    return;
                }
                if (chvProfilePage == null || chvProfilePage.trim().length == 0) {
                    reject('Invalid profile page information');
                    return;
                }
                if (!Number.isInteger(intAssessmentSchemaDetailID)) {
                    reject('Invalid assessment schema detail id');
                    return;
                }
                if (!Number.isInteger(intTableID) && !intTableID) {
                    reject('Invalid table id');
                    return;
                }
                if (!Number.isInteger(intColumnID) && !intColumnID) {
                    reject('Invalid column id');
                    return;
                }
                if (!Number.isInteger(intPersonID) && !intPersonID) {
                    reject('Invalid person id');
                    return;
                }
                const queryRequest = new sql.Request();
                queryRequest.input('intAssessmentSchemaDetailID', sql.Int, intAssessmentSchemaDetailID);
                queryRequest.input('intTableID', sql.Int, intTableID);
                queryRequest.input('intColumnID', sql.Int, intColumnID);
                queryRequest.input('chvSelectStoredProcedure', sql.NVarChar, chvSelectStoredProcedure);
                queryRequest.input('chvUpsertStoredProcedure', sql.NVarChar, chvUpsertStoredProcedure);
                queryRequest.input('chvProfilePage', sql.NVarChar, chvProfilePage);
                queryRequest.input('intModifiedByID', sql.Int, intPersonID);
    
                this.pool.then(() => {
                    return queryRequest.execute('spUpsertAssessmentSchemaDetails');
                })
                .then(() => {
                    resolve(true);
                })
                .catch((e) => {
                    reject(e);
                });
            });
        }
 
    public getAssessmentScoreLevels():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intAssessmentScoreLevelID, intAssessmentID, chvAssessmentTitle, chvAssessmentScoreLevel, intAssessmentScoreLevelMin, intAssessmentScoreLevelMax, FORMAT(dteAssessmentScoreLevelModified, 'dd-MMM-yyyy') AS dteAssessmentScoreLevelModified, intAssessmentScoreLevelModifiedByID FROM vwAssessmentScoreLevels;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * CREATE/UPDATE record in tblAssessmentScoreLevels database table
     * @param intAssessmentScoreLevelID 0 for new record other update existing record
     * @param intAssessmentID integer value referring to tblAssessments.intAssessmentID 
     * @param chvAssessmentScoreLevel string information for assessment score level
     * @param intAssessmentScoreLevelMin minimum integer value for assessment score level
     * @param intAssessmentScoreLevelMax maximum integer value for assessment score level
     * @param intModifiedByID integer value referring to tblPersons.intPersonID
     * @returns boolean true for successful operation
     */
    public upsertAssessmentScoreLevel(intAssessmentScoreLevelID=0,
        intAssessmentID=0,
        chvAssessmentScoreLevel='',
        intAssessmentScoreLevelMin=0,
        intAssessmentScoreLevelMax=0,
        intModifiedByID=0):Promise<boolean>{
            return new Promise((resolve, reject) => {
                if (chvAssessmentScoreLevel == null || chvAssessmentScoreLevel.trim().length == 0) {
                    reject('Invalid assessment score level information');
                    return;
                }
                if (!Number.isInteger(intAssessmentID) && !intAssessmentID) {
                    reject('Invalid assessment id');
                    return;
                }
                if (!Number.isInteger(intModifiedByID) && !intModifiedByID) {
                    reject('Invalid modified by id');
                    return;
                }
                if (!Number.isInteger(intAssessmentScoreLevelID)) {
                    reject('Invalid assessment score level id');
                    return;
                }
                if (!Number.isInteger(intAssessmentScoreLevelMin)) {
                    reject('Invalid assessment score level min');
                    return;
                }
                if (!Number.isInteger(intAssessmentScoreLevelMax)) {
                    reject('Invalid assessment score level max');
                    return;
                }
                const queryRequest = new sql.Request();
                queryRequest.input('intAssessmentScoreLevelID', sql.Int, intAssessmentScoreLevelID);
                queryRequest.input('intAssessmentID', sql.Int, intAssessmentID);
                queryRequest.input('chvAssessmentScoreLevel', sql.NVarChar, chvAssessmentScoreLevel);
                queryRequest.input('intAssessmentScoreLevelMin', sql.Int, intAssessmentScoreLevelMin);                
                queryRequest.input('intAssessmentScoreLevelMax', sql.Int, intAssessmentScoreLevelMax);                
                queryRequest.input('intModifiedByID', sql.Int, intModifiedByID);
                this.pool.then(() => {
                    return queryRequest.execute('spUpsertAssessmentScoreLevel');
                })
                .then(() => {
                    resolve(true);
                })
                .catch((e) => {
                    reject(e);
                });
            });
        }

    public getAssessmentSubCategories():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intAssessmentSubCategoryID, chvAssessmentSubCategory, intAssessmentCategoryID, chvAssessmentCategory, FORMAT(GetDate(), 'dd-MMM-yyyy') AS dteAssessmentSubCategoryModified FROM vwAssessmentSubCategories`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * CREATE/UPDATE record in the tlkpAssessmentSubCategories database table
     * @param intAssessmentSubCategoryID integer 0 for a new record, update a record otherwise
     * @param chvAssessmentSubCategory string value information
     * @param intAssessmentCategoryID integer value referring to tlkpAssessmentCategory.intAssessmentCategoryID
     * @returns boolean true for a successful operation
     */
    public upsertAssessmentSubCategory(intAssessmentSubCategoryID = 0, chvAssessmentSubCategory = '', intAssessmentCategoryID=0):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (!Number.isInteger(intAssessmentSubCategoryID)) {
                reject('Invalid assessment subcategory id');
                return;
            }
            if (!Number.isInteger(intAssessmentCategoryID) && !intAssessmentCategoryID) {
                reject('Invalid assessment category id');
                return;
            }
            if (chvAssessmentSubCategory == null || chvAssessmentSubCategory.trim().length == 0) {
                reject('Invalid assessment subcategory information');
                return;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intAssessmentSubCategoryID', sql.Int, intAssessmentSubCategoryID);            
            queryRequest.input('chvAssessmentSubCategory', sql.NVarChar, chvAssessmentSubCategory);
            queryRequest.input('intAssessmentCategoryID', sql.Int, intAssessmentCategoryID);
            this.pool.then(() => {
                return queryRequest.execute('spUpsertAssessmentSubCategory');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getAuditPages():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intAuditPageID, chvAuditPageName, chvAuditSection, chvAuditPage, FORMAT(dteAuditPageModified, 'dd-MMM-yyyy') AS dteAuditPageModified FROM tlkpAuditPages ORDER BY chvAuditPage;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * CREATE/MODIFY records in tlkpAuditPages
     * @param intAuditPageID 0 for new record, otherwise modify existing record
     * @param chvAuditPageName string value for the audit page name
     * @param chvAuditSection  string value for the audit page section
     * @param chvAuditPage string value for the audit page
     * @returns boolean true for successful operation
     */
    public upsertAuditPage(intAuditPageID=0, chvAuditPageName='', chvAuditSection='', chvAuditPage=''):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (chvAuditPage == null || chvAuditPage.trim().length == 0) {
                reject('Invalid audit page information');
                return;
            }
            if (chvAuditPageName == null || chvAuditPageName.trim().length == 0) {
                reject('Invalid audit page name information');
                return;
            }
            if (chvAuditSection == null || chvAuditSection.trim().length == 0) {
                reject('Invalid audit section information');
                return;
            }
            
            if (!Number.isInteger(intAuditPageID)) {
                reject('Invalid audit page id');
                return;
            }
            
            const queryRequest = new sql.Request();
            queryRequest.input('intAuditPageID', sql.Int, intAuditPageID);        
            queryRequest.input('chvAuditPageName', sql.NVarChar, chvAuditPageName);
            queryRequest.input('chvAuditSection', sql.NVarChar, chvAuditSection);
            queryRequest.input('chvAuditPage', sql.NVarChar, chvAuditPage);       
    
            this.pool.then(() => {
                return queryRequest.execute('spUpsertAuditPage');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
        
    
    }

    public getCarePlanAreas():Promise<Array<Object>>{ 
        return new Promise((resolve, reject) => {
            let query = `SELECT intCarePlanAreaID, chvCarePlanArea, chvCarePlanAreaDescription, FORMAT(dteCarePlanAreaModified, 'dd-MMM-yyyy') AS dteCarePlanAreaModified FROM tlkpCarePlanAreas ORDER BY chvCarePlanArea;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }

                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * Create/Modify record in tlkpCarePlanAreas database table
     * @param intCarePlanAreaID 0 for a new record otherwise  modify existing record
     * @param chvCarePlanArea string value for care plan area
     * @param chvCarePlanAreaDescription optional string description
     * @returns boolean true for successful operation
     */
    public upsertCarePlanAreas(intCarePlanAreaID=0, chvCarePlanArea='', chvCarePlanAreaDescription):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (chvCarePlanArea == null || chvCarePlanArea.trim().length == 0) {
                reject('Invalid care plan area information');
                return;
            }
            if (chvCarePlanAreaDescription == null || chvCarePlanAreaDescription.trim().length == 0) {
                reject('Invalid audit page name information');
                return;
            }
            
            if (!Number.isInteger(intCarePlanAreaID)) {
                reject('Invalid care plan area id');
                return;
            }
            
            const queryRequest = new sql.Request();
            queryRequest.input('intCarePlanAreaID', sql.Int, intCarePlanAreaID);        
            queryRequest.input('chvCarePlanArea', sql.NVarChar, chvCarePlanArea);
            queryRequest.input('chvCarePlanAreaDescription', sql.NVarChar, chvCarePlanAreaDescription);
    
            this.pool.then(() => {
                return queryRequest.execute('spUpsertCarePlanAreas');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getContactPersonFors():Promise<Array<Object>>{ 
        return new Promise((resolve, reject) => {
            let query = `SELECT intContactPersonForID, chvContactPersonFor, FORMAT(dteContactPersonForModified, 'dd-MMM-yyyy') AS dteContactPersonForModified FROM tlkpContactPersonFors ORDER BY chvContactPersonFor;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * Create/modify record in the tlkpContactPersonFors database table
     * @param intContactPersonForID 0 for new record, else new record
     * @param chvContactPersonFor string value for contact personfor
     * @returns boolean true for a successful operation
     */
    public upsertContactPersonFors(intContactPersonForID=0, chvContactPersonFor=''):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (chvContactPersonFor == null || chvContactPersonFor.trim().length == 0) {
                reject('Invalid contact person for information');
                return;
            }            
            
            if (!Number.isInteger(intContactPersonForID)) {
                reject('Invalid contact persons for id');
                return;
            }
            
            const queryRequest = new sql.Request();
            queryRequest.input('intContactPersonForID', sql.Int, intContactPersonForID);        
            queryRequest.input('chvContactPersonFor', sql.NVarChar, chvContactPersonFor);            
    
            this.pool.then(() => {
                return queryRequest.execute('spUpsertContactPersonFors');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getContactPersonTypes():Promise<Array<Object>>{ 
        return new Promise((resolve, reject) => {
            let query = `SELECT intContactPersonTypeID, chvContactPersonType, FORMAT(dteContactPersonTypeModified, 'dd-MMM-yyyy') AS dteContactPersonTypeModified FROM tlkpContactPersonTypes ORDER BY chvContactPersonType;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * Create/update a record in the tlkpContactPersonTypes database table
     * @param intContactPersonTypeID 0 for new record otherwise update existing one
     * @param chvContactPersonType  string information for the person type
     * @returns boolean true for a successful operation
     */
    public upsertContactPersonTypes(intContactPersonTypeID=0, chvContactPersonType=''):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (chvContactPersonType == null || chvContactPersonType.trim().length == 0) {
                reject('Invalid contact person type information');
                return;
            }            
            
            if (!Number.isInteger(intContactPersonTypeID)) {
                reject('Invalid contact person type id');
                return;
            }
            
            const queryRequest = new sql.Request();
            queryRequest.input('intContactPersonTypeID', sql.Int, intContactPersonTypeID);        
            queryRequest.input('chvContactPersonType', sql.NVarChar, chvContactPersonType);            
    
            this.pool.then(() => {
                return queryRequest.execute('spUpsertContactPersonTypes');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }


    public getContactSupplierFors():Promise<Array<Object>>{ 
        return new Promise((resolve, reject) => {
            let query = `SELECT intContactSupplierForID, chvContactSupplierFor, FORMAT(dteContactSupplierForModified, 'dd-MMM-yyyy') AS dteContactSupplierForModified FROM tlkpContactSupplierFors ORDER BY chvContactSupplierFor;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * Create/modify record in the tlkpContactSupplierFors database table
     * @param intContactSupplierForID primary key for tlkpContactSupplierFors, 0 for new record, otherwise modify existing one
     * @param chvContactSupplierFor string value for contact supplier
     * @returns boolean true for successful operation
     */
    public upsertContactSupplierFors(intContactSupplierForID = 0, chvContactSupplierFor=''):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (chvContactSupplierFor == null || chvContactSupplierFor.trim().length == 0) {
                reject('Invalid contact supplier for information');
                return;
            }            
            
            if (!Number.isInteger(intContactSupplierForID)) {
                reject('Invalid contact supplier for id');
                return;
            }
            
            const queryRequest = new sql.Request();
            queryRequest.input('intContactSupplierForID', sql.Int, intContactSupplierForID);        
            queryRequest.input('chvContactSupplierFor', sql.NVarChar, chvContactSupplierFor);            
    
            this.pool.then(() => {
                return queryRequest.execute('spUpsertContactSupplierFors');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getContactSupplierTypes():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intContactSupplierTypeID, chvContactSupplierType, FORMAT(dteContactSupplierTypeModified, 'dd-MMM-yyyy') AS dteContactSupplierTypeModified FROM tlkpContactSupplierTypes ORDER BY chvContactSupplierType;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * Create/modify record in the tlkpContactSupplierTypes database table
     * @param intContactSupplierTypeID primary key id, 0 for new record otherwise update existing record
     * @param chvContactSupplierType string value for contact supplier type
     * @returns boolean true for a successful operation
     */
    public upsertContactSupplierTypes(intContactSupplierTypeID=0, chvContactSupplierType=''):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (chvContactSupplierType == null || chvContactSupplierType.trim().length == 0) {
                reject('Invalid contact supplier for information');
                return;
            }            
            
            if (!Number.isInteger(intContactSupplierTypeID)) {
                reject('Invalid contact supplier for id');
                return;
            }
            
            const queryRequest = new sql.Request();
            queryRequest.input('intContactSupplierTypeID', sql.Int, intContactSupplierTypeID);        
            queryRequest.input('chvContactSupplierType', sql.NVarChar, chvContactSupplierType);            
    
            this.pool.then(() => {
                return queryRequest.execute('spUpsertContactSupplierTypes');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getCountries():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intCountryID, chvCountryName, chvNationality, chvCountryFlagName, FORMAT(dteCountryModified, 'dd-MMM-yyyy') AS dteCountryModified FROM tlkpCountries ORDER BY chvCountryName;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then(result => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * Creates/updates record in tlkpCountries database table
     * @param intCountryID primary key integer for the table
     * @param chvCountryName the name of the country
     * @param chvNationality nationality of the people in the country
     * @param chvCountryFlagName flag name for the country
     * @returns boolean true for successful operation
     */
    public upsertCountries(intCountryID=0, chvCountryName='', chvNationality='', chvCountryFlagName=''):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (chvCountryName == null || chvCountryName.trim().length == 0) {
                reject('Invalid chvCountryName information');
                return;
            } 
            if (chvNationality == null || chvNationality.trim().length == 0) {
                reject('Invalid chvNationality information');
                return;
            }
            if (chvCountryFlagName == null || chvCountryFlagName.trim().length == 0) {
                reject('Invalid chvCountryFlagName information');
                return;
            }               
            
            if (!Number.isInteger(intCountryID)) {
                reject('Invalid country id');
                return;
            }
            
            const queryRequest = new sql.Request();
            queryRequest.input('intCountryID', sql.Int, intCountryID);
            queryRequest.input('chvCountryName', sql.NVarChar, chvCountryName);   
            queryRequest.input('chvNationality', sql.NVarChar, chvNationality);           
            queryRequest.input('chvCountryFlagName', sql.NVarChar, chvCountryFlagName);            
    
            this.pool.then(() => {
                return queryRequest.execute('spUpsertCountries');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getDepartments(tz=null):Promise<Array<Object>>{
        return new Promise((resolve, reject) => {            
            const queryRequest = new sql.Request();            
            queryRequest.input('intTimeZone', sql.Int, tz); 

            this.pool.then(() => {
                return queryRequest.execute('spSelectDepartments');
            })
            .then((result) => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            })
            .catch((e) => {
                reject(e);
            });

        });
    }


    /**
     * Create/update record in the tblDepartments database table
     * @param intDepartmentID primary key for tblDepartments, 0 for new record otherwise update existing record
     * @param chvDepartmentName string value for the name of the department
     * @param intDepartmentIsActiveID integer value, 1 for active
     * @param intDepartmentStaffRoleID foreign key from tlkpStaffRoles.intStaffRoleID
     * @param intDepartmentManagerID foreign key REFERENCES dbo.tblPersons (intPersonID)
     * @param chvDepartmentTeamsURL 
     * @param chvDepartmentEmailAddress string value of department's URL
     * @param chvDepartmentDescription  string value for department's description
     * @param intModifiedByID foreign key references tblPersons (intPersonID)
     * @returns boolean true for successful operation
     */
    public upsertDepartment(intDepartmentID=0,
        chvDepartmentName='',
        intDepartmentIsActiveID=1,
        intDepartmentStaffRoleID=0,
        intDepartmentManagerID = 0,
        chvDepartmentTeamsURL='',
        chvDepartmentEmailAddress=null,
        chvDepartmentDescription=null,
        intModifiedByID = 0
    ):Promise<boolean>{
        return new Promise((resolve, reject) => {
            let active = 1;
            if (chvDepartmentName == null || chvDepartmentName.trim().length == 0) {
                reject('Invalid chvDepartmentName information');
                return;
            } 
            
            if (chvDepartmentTeamsURL == null || chvDepartmentTeamsURL.trim().length == 0) {
                reject('Invalid chvDepartmentTeamsURL information');
                return;
            }               
            
            if (!Number.isInteger(intDepartmentID)) {
                reject('Invalid department id');
                return;
            }
            if (!Number.isInteger(intDepartmentStaffRoleID) || intDepartmentStaffRoleID <= 0 ) {
                reject('Invalid intDepartmentStaffRoleID');
                return;
            }
            if (!Number.isInteger(intDepartmentManagerID) || intDepartmentManagerID <= 0 ) {
                reject('Invalid intDepartmentManagerID');
                return;
            }
            if (!Number.isInteger(intModifiedByID) || intModifiedByID <= 0 ) {
                reject('Invalid intModifiedByID');
                return;
            }

            if (Number.isInteger(intDepartmentIsActiveID) && intDepartmentIsActiveID > 0) {
                active = 1;
            } else {
                active = 0;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intDepartmentID', sql.Int, intDepartmentID);
            queryRequest.input('chvDepartmentName', sql.NVarChar, chvDepartmentName);
            queryRequest.input('intDepartmentIsActiveID', sql.Int, active);   
            queryRequest.input('intDepartmentStaffRoleID', sql.Int, intDepartmentStaffRoleID);            
            queryRequest.input('intDepartmentManagerID', sql.Int, intDepartmentManagerID); 
            queryRequest.input('chvDepartmentTeamsURL', sql.NVarChar, chvDepartmentTeamsURL); 
            queryRequest.input('chvDepartmentEmailAddress', sql.NVarChar, chvDepartmentEmailAddress); 
            queryRequest.input('chvDepartmentDescription', sql.NVarChar, chvDepartmentDescription); 
            queryRequest.input('intModifiedByID', sql.Int, intModifiedByID);
            this.pool.then(() => {
                return queryRequest.execute('spUpsertDepartment');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });

    }

    public getEmploymentClassifications():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intEmploymentClassificationID, chvEmploymentClassification, chvEmploymentClassificationAbrv, FORMAT(dteEmploymentClassificationModified, 'dd-MMM-yyyy') AS dteEmploymentClassificationModified FROM tlkpEmploymentClassifications ORDER BY chvEmploymentClassification;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then((result) => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * creates/updates record in tlkpEmploymentClassifications database table
     * @param intEmploymentClassificationID primary key integer, 0 for new record otherwise update existing record
     * @param chvEmploymentClassification string value for employment classification
     * @param chvEmploymentClassificationAbrv string value abbreviate for employment classification
     * @returns boolean true for successful operation
     */
    public upsertEmploymentClassification(intEmploymentClassificationID=0, chvEmploymentClassification='', chvEmploymentClassificationAbrv=''):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (chvEmploymentClassification == null || chvEmploymentClassification.trim().length == 0) {
                reject('Invalid chvEmploymentClassification information');
                return;
            }          
            if (chvEmploymentClassificationAbrv == null || chvEmploymentClassificationAbrv.trim().length == 0) {
                reject('Invalid chvEmploymentClassificationAbrv information');
                return;
            } 

            
            if (!Number.isInteger(intEmploymentClassificationID)) {
                reject('Invalid intEmploymentClassificationID');
                return;
            }
            
            const queryRequest = new sql.Request();
            queryRequest.input('intEmploymentClassificationID', sql.Int, intEmploymentClassificationID);        
            queryRequest.input('chvEmploymentClassification', sql.NVarChar, chvEmploymentClassification);            
            queryRequest.input('chvEmploymentClassificationAbrv', sql.NVarChar, chvEmploymentClassificationAbrv);            
    
            this.pool.then(() => {
                return queryRequest.execute('spUpsertEmploymentClassification');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getEmploymentTypes():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intEmploymentTypeID, chvEmploymentType, intEmploymentClassificationID, chvEmploymentClassification, chvEmploymentClassificationAbrv, intGrade, FORMAT(dteEmploymentTypeModified, 'dd-MMM-yyyy') AS dteEmploymentTypeModified FROM vwEmploymentTypes;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then((result) => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * 
     * @param intEmploymentTypeID primary key, 0 for new record otherwise update existing record
     * @param intEmploymentClassificationID foreign key references tlkpEmploymentClassifications (intEmploymentClassificationID)
     * @param chvEmploymentType string value employment type
     * @param intGrade integer grade value
     * @returns boolean true for a successful operation
     */
    public upsertEmploymentType(intEmploymentTypeID=0, intEmploymentClassificationID=0, chvEmploymentType='', intGrade=0):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (chvEmploymentType == null || chvEmploymentType.trim().length == 0) {
                reject('Invalid chvEmploymentType information');
                return;
            }          
            
            if (!Number.isInteger(intEmploymentTypeID)) {
                reject('Invalid intEmploymentTypeID');
                return;
            }
            
            if (!Number.isInteger(intEmploymentClassificationID)) {
                reject('Invalid intEmploymentClassificationID');
                return;
            }

            if (!Number.isInteger(intGrade)) {
                reject('Invalid intGrade');
                return;
            }

            const queryRequest = new sql.Request();
            queryRequest.input('intEmploymentTypeID', sql.Int, intEmploymentTypeID);        
            queryRequest.input('intEmploymentClassificationID', sql.Int, intEmploymentClassificationID);
            queryRequest.input('chvEmploymentType', sql.NVarChar, chvEmploymentType);            
            queryRequest.input('intGrade', sql.Int, intGrade); 
    
            this.pool.then(() => {
                return queryRequest.execute('spUpsertEmploymentType');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getFileGroups():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intFileGroupID, chvFileGroupName, FORMAT(dteFileGroupModified, 'dd-MMM-yyyy') AS dteFileGroupModified FROM tlkpFileGroups ORDER BY chvFileGroupName;`;
            this.pool.then(() => {
                return sql.query(query);
            }).then((result) => {
                if (result.recordset.length == 0) {
                    reject('No records found');
                    return;
                }
                resolve(result.recordset);
            }).catch(e => {
                reject(e);
            }); 
        });
    }

    /**
     * Create/update record in tlkpFileGroups database table
     * @param intFileGroupID prinary key for table tlkpFileGroups, 0 for new record, update existing record otherwise
     * @param chvFileGroupName string value for file group name
     * @returns boolean true for a successful operation
     */
    public upsertFileGroups(intFileGroupID = 0, chvFileGroupName = ''):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (chvFileGroupName == null || chvFileGroupName.trim().length == 0) {
                reject('Invalid chvFileGroupName information');
                return;
            }

            if (!Number.isInteger(intFileGroupID)) {
                reject('Invalid intFileGroupID');
                return;
            }

            const queryRequest = new sql.Request();
            queryRequest.input('intFileGroupID', sql.Int, intFileGroupID);           
            queryRequest.input('chvFileGroupName', sql.NVarChar, chvFileGroupName); 
            queryRequest.input('chvFileGroupDescription', sql.NVarChar, null); 
            queryRequest.input('chvFileGroupIcon', sql.NVarChar, null);
            

            this.pool.then(() => {
                return queryRequest.execute('spUpsertFileGroups');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });

        });

    }

    /**
     * closes database connection
     */
     public closeConnection() {
        this.pool.then((pool) => {
            pool.close();
        })
    }
}