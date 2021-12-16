import * as sql  from 'mssql';
import { reject, resolve } from "promise";
import { Context } from "@azure/functions";
import configDb from '../config/conf'; 

export class DbTableOperator {
    private context:Context = null;
    private pool:Promise<sql.ConnectionPool> = sql.connect(configDb);

    constructor(context=null) {
        this.context = context;
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

    public getFundingDetails():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT	intFundingID, intAccountFundingTypeID, chvAccountFundingType, intAccountFundingDetailID, chvAccountFundingDetail, amtCaseManagementFee, FORMAT(amtFundingValue, 'C') AS amtFundingValue, amtInvoiceDiscount, intFundingDetailModifiedByID, chvModifiedByName, FORMAT(dteFundingDetailModified, 'dd-MMM-yyyy') AS dteFundingDetailModified FROM vwFundingDetails;`;
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
     * Creates/update record in the tblFundingDetails database table
     * @param intFundingID primary key id for tblFundingDetails, 0 for new record, otherwise update existing record 
     * @param intAccountFundingTypeID foreign key references dbo.tlkpAccountFundingTypes (intAccountFundingTypeID)
     * @param intAccountFundingDetailID foreign key references dbo.tlkpAccountFundingDetails (intAccountFundingDetailID)
     * @param amtCaseManagementFee float value case management fee
     * @param amtInvoiceDiscount float value invoice discount  
     * @param amtFundingValue float value funding amount
     * @param intPersonID foreign key references dbo.tblPersons (intPersonID)
     * @returns boolean true for successful operation
     */
    public upsertFundingDetails(intFundingID=0,
        intAccountFundingTypeID = 0,
        intAccountFundingDetailID=0,
        amtCaseManagementFee=0.00,
        amtInvoiceDiscount=0.00,
        amtFundingValue=0.00,
        intPersonID = 0
    ):Promise<boolean>{
        return new Promise((resolve, reject) => {
            let caseManagementFee = 0.00; 
            let invoiceDiscount = 0.00;
            let fundingValue = 0.00;
            
            if (amtCaseManagementFee.toString().match(/[A-Za-z\-\*\$()#&@~!`\=\+\*\^\%\$]/g) == null) {
                caseManagementFee = amtCaseManagementFee;
            }
            if (amtInvoiceDiscount.toString().match(/[A-Za-z\-\*\$()#&@~!`\=\+\*\^\%\$]/g) == null) {
                invoiceDiscount = amtInvoiceDiscount;
            }
            if(amtFundingValue.toString().match(/[A-Za-z\-\*\$()#&@~!`\=\+\*\^\%\$]/g) == null) {
                fundingValue = amtFundingValue
            }

            if (!Number.isInteger(intFundingID)) {
                reject('Invalid intFundingID');
                return;
            }
            if (!Number.isInteger(intAccountFundingTypeID)) {
                reject('Invalid intAccountFundingTypeID');
                return;
            }
            if (!Number.isInteger(intAccountFundingDetailID)) {
                reject('Invalid intAccountFundingDetailID');
                return;
            }
            if (!Number.isInteger(intPersonID) || intPersonID <= 0) {
                reject('Invalid intPersonID');
                return;
            }

            const queryRequest = new sql.Request();
            queryRequest.input('intFundingID', sql.Int, intFundingID); 
            queryRequest.input('intAccountFundingTypeID', sql.Int, intAccountFundingTypeID); 
            queryRequest.input('intAccountFundingDetailID', sql.Int, intAccountFundingDetailID); 
            queryRequest.input('amtCaseManagementFee', sql.Decimal(12,2), caseManagementFee); 
            queryRequest.input('amtInvoiceDiscount', sql.Decimal(12,2), invoiceDiscount);             
            queryRequest.input('amtFundingValue', sql.Decimal(12,2), fundingValue);
            queryRequest.input('intModifiedByID', sql.Int, intPersonID);
            

            this.pool.then(() => {
                return queryRequest.execute('spUpsertFundingDetails');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });

        });
    }

    public getGroupServices():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            const queryRequest = new sql.Request();
            queryRequest.input('intIsActiveID', sql.Int, 0); 
            this.pool.then(() => {
                return queryRequest.execute('spSelectGroupServices');
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
     * Create/update record in tblGroupServices database table
     * @param intGroupServiceID tblGroupServices primary key, 0 for new record otherwise update existing record
     * @param intServiceID foreign key references dev-iseekhome.dbo.tblServices (intServiceID)
     * @param intServiceGroupID foreign key references dbo.tblServiceGroups (intServiceGroupID)
     * @param intPersonID foreign key references dbo.tblPersons (intPersonID)
     * @returns boolean true for successful operation
     */
    public upsertGroupServices(intGroupServiceID = 0, intServiceID = 0, intServiceGroupID = 0, intPersonID = 0):Promise<boolean>{
        return new Promise((resolve, reject) => {            

            if (!Number.isInteger(intGroupServiceID)) {
                reject('Invalid intGroupServiceID');
                return;
            }
            if (!Number.isInteger(intServiceID) || intServiceID <= 0) {
                reject('Invalid intServiceID');
                return;
            }
            if (!Number.isInteger(intServiceGroupID) || intServiceGroupID <= 0) {
                reject('Invalid intServiceGroupID');
                return;
            }
            if (!Number.isInteger(intPersonID) || intPersonID <= 0) {
                reject('Invalid intPersonID');
                return;
            }

            const queryRequest = new sql.Request();
            queryRequest.input('intGroupServiceID', sql.Int, intGroupServiceID); 
            queryRequest.input('intServiceID', sql.Int, intServiceID);
            queryRequest.input('intServiceGroupID', sql.Int, intServiceGroupID);
            queryRequest.input('intModifiedByID', sql.Int, intPersonID);
            this.pool.then(() => {
                return queryRequest.execute('spUpsertGroupServices');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });

        });

    }

    public deleteGroupService(intGroupServiceID=0, intPersonID = 0):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (!Number.isInteger(intGroupServiceID) || intGroupServiceID <= 0) {
                reject('Invalid intGroupServiceID');
                return;
            }
            if (!Number.isInteger(intPersonID) || intPersonID <= 0) {
                reject('Invalid intPersonID');
                return;
            }
            const queryRequest = new sql.Request();
            queryRequest.input('intGroupServiceID', sql.Int, intGroupServiceID); 
            queryRequest.input('intModifiedByID', sql.Int, intPersonID);
            this.pool.then(() => {
                return queryRequest.execute('spDeleteGroupService');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });

        });
    }

    public getHealthConditions():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT DISTINCT tblHealthConditions.intHealthConditionID, tblHealthConditions.chvHealthConditionName, tblHealthConditions.intIsActiveID, tblHealthConditionDescriptions.chlHealthConditionDescription, tblHealthConditions.intHealthConditionModifiedByID, FORMAT(tblHealthConditions.dteHealthConditionModified, 'dd-MMM-yyyy') AS dteHealthConditionModified FROM tblHealthConditions  LEFT JOIN tblHealthConditionDescriptions ON tblHealthConditionDescriptions.intHealthConditionID = tblHealthConditions.intHealthConditionID;
            `;
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
     * creates/update record in tblHealthConditions database table
     * @param intHealthConditionID primary key for tblHealthConditions 0 for new record, otherwise update existing record
     * @param chvHealthConditionName string value for health condition name
     * @param intIsActiveID integer value indicating active status, 0 for inactive else active
     * @param chlHealthConditionDescription string value describing/supporting the health condition
     * @param intPersonID foreign key referencing dbo.tblPersons(intPersonID)
     * @returns boolean true for successful operation
     */
    public upsertHealthConditions(intHealthConditionID = 0,
        chvHealthConditionName='',
        intIsActiveID=0,
        chlHealthConditionDescription='',
        intPersonID = 0
    ):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (!Number.isInteger(intIsActiveID)) {
                reject('Invalid intIsActiveID');
                return;
            }
            if (!Number.isInteger(intPersonID) || intPersonID <= 0) {
                reject('Invalid intPersonID');
                return;
            }
            if (!Number.isInteger(intHealthConditionID)) {
                reject('Invalid intHealthConditionID');
                return;
            }
            if (chvHealthConditionName == null || chvHealthConditionName.trim().length == 0) {
                reject('Invalid chvHealthConditionName information');
                return;
            }

            const queryRequest = new sql.Request();
            queryRequest.input('intHealthConditionID', sql.Int, intHealthConditionID); 
            queryRequest.input('chvHealthConditionName', sql.NVarChar, chvHealthConditionName); 
            queryRequest.input('chlHealthConditionDescription', sql.NVarChar, chlHealthConditionDescription); 
            queryRequest.input('intIsActiveID', sql.Int, intIsActiveID);
            queryRequest.input('intModifiedByID', sql.Int, intPersonID);
            this.pool.then(() => {
                return queryRequest.execute('spUpsertHealthConditions');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });

        });
    }

    public getIncidentActions():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intIncidentActionID, chvIncidentAction, chvIncidentActionDescription, FORMAT(dteIncidentActionModified, 'dd-MMM-yyyy') AS dteIncidentActionModified FROM tlkpIncidentActions ORDER BY chvIncidentAction;`;
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
     * Creates/update record in tlkpIncidentActions database table
     * @param intIncidentActionID primary key for tlkpIncidentActions database table, 0 for new record otherwise update existing record 
     * @param chvIncidentAction string value for the incident
     * @param chvIncidentActionDescription string value for describing the incident
     * @returns boolean true for successful operation
     */
    public upsertIncidentAction(intIncidentActionID= 0, chvIncidentAction:string=null, chvIncidentActionDescription:string = null):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (!Number.isInteger(intIncidentActionID)) {
                reject('Invalid intIncidentActionID');
                return;
            }
            
            if (chvIncidentAction == null || chvIncidentAction.trim().length == 0) {
                reject('Invalid chvIncidentAction information');
                return;
            }

            const queryRequest = new sql.Request();
            queryRequest.input('intIncidentActionID', sql.Int, intIncidentActionID); 
            queryRequest.input('chvIncidentAction', sql.NVarChar, chvIncidentAction); 
            queryRequest.input('chvIncidentActionDescription', sql.NVarChar, chvIncidentActionDescription);
            this.pool.then(() => {
                return queryRequest.execute('spUpsertIncidentAction');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });

        });
    }

    public getIncidentDamages():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intIncidentDamageID, chvIncidentDamage, chvIncidentDamageDescription, FORMAT(dteIncidentDamageModified, 'dd-MMM-yyyy') AS dteIncidentDamageModified FROM tlkpIncidentDamages ORDER BY chvIncidentDamage;`;
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
     * Creates/updates record in tlkpIncidentDamages database table
     * @param intIncidentDamageID primary key for tlkpIncidentDamages, 0 for new record, else update existing record
     * @param chvIncidentDamage string value for incident damage
     * @param chvIncidentDamageDescription string value describing the incident damage
     * @returns boolean true for successful operation
     */
    public upsertIncidentDamages(intIncidentDamageID = 0, chvIncidentDamage:string=null, chvIncidentDamageDescription:string = null):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (!Number.isInteger(intIncidentDamageID)) {
                reject('Invalid intIncidentDamageID');
                return;
            }
            
            if (chvIncidentDamage == null || chvIncidentDamage.trim().length == 0) {
                reject('Invalid chvIncidentDamage information');
                return;
            }

            const queryRequest = new sql.Request();
            queryRequest.input('intIncidentDamageID', sql.Int, intIncidentDamageID); 
            queryRequest.input('chvIncidentDamage', sql.NVarChar, chvIncidentDamage); 
            queryRequest.input('chvIncidentDamageDescription', sql.NVarChar, chvIncidentDamageDescription);
            this.pool.then(() => {
                return queryRequest.execute('spUpsertIncidentDamages');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getIncidentDetailTypes():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intIncidentDetailTypeID, chvIncidentDetailType, chvIncidentDetailTypeDescription, FORMAT(dteIncidentDetailTypeModified, 'dd-MMM-yyyy') AS dteIncidentDetailTypeModified FROM tlkpIncidentDetailTypes ORDER BY chvIncidentDetailType;`;
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
     * creates/upates record in tlkpIncidentDetailTypes database table
     * @param intIncidentDetailTypeID primary key for tlkpIncidentDetailTypes 0 for new record otherwise updates existing record
     * @param chvIncidentDetailType string value for incident detail type name
     * @param chvIncidentDetailTypeDescription 
     * @returns boolean true for successful operation
     */
    public upsertIncidentDetailTypes(intIncidentDetailTypeID=0, chvIncidentDetailType:string = null, chvIncidentDetailTypeDescription:string = null):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (!Number.isInteger(intIncidentDetailTypeID)) {
                reject('Invalid intIncidentDetailTypeID');
                return;
            }
            
            if (chvIncidentDetailType == null || chvIncidentDetailType.trim().length == 0) {
                reject('Invalid chvIncidentDetailType information');
                return;
            }

            const queryRequest = new sql.Request();
            queryRequest.input('intIncidentDetailTypeID', sql.Int, intIncidentDetailTypeID); 
            queryRequest.input('chvIncidentDetailType', sql.NVarChar, chvIncidentDetailType); 
            queryRequest.input('chvIncidentDetailTypeDescription', sql.NVarChar, chvIncidentDetailTypeDescription);
            this.pool.then(() => {
                return queryRequest.execute('spUpsertIncidentDetailTypes');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getIncidentEscalationPathways():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intIncidentEscalationPathwayID, chvIncidentEscalationPathway, chvIncidentEscalationPathwayDescription, FORMAT(dteIncidentEscalationPathwayModified, 'dd-MMM-yyyy') AS dteIncidentEscalationPathwayModified FROM tlkpIncidentEscalationPathways ORDER BY chvIncidentEscalationPathway;`;
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
     * Create/update record in tlkpIncidentEscalationPathways database table
     * @param intIncidentEscalationPathwayID 
     * @param chvIncidentEscalationPathway 
     * @param chvIncidentEscalationPathwayDescription 
     * @returns 
     */
    public upsertIncidentEscalationPathway(intIncidentEscalationPathwayID=0, chvIncidentEscalationPathway:string=null, chvIncidentEscalationPathwayDescription:string = null):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (!Number.isInteger(intIncidentEscalationPathwayID)) {
                reject('Invalid intIncidentEscalationPathwayID');
                return;
            }
            
            if (chvIncidentEscalationPathway == null || chvIncidentEscalationPathway.trim().length == 0) {
                reject('Invalid chvIncidentEscalationPathway information');
                return;
            }

            const queryRequest = new sql.Request();
            queryRequest.input('intIncidentEscalationPathwayID', sql.Int, intIncidentEscalationPathwayID); 
            queryRequest.input('chvIncidentEscalationPathway', sql.NVarChar, chvIncidentEscalationPathway);
            queryRequest.input('chvIncidentEscalationPathwayDescription', sql.NVarChar, chvIncidentEscalationPathwayDescription);
            this.pool.then(() => {
                return queryRequest.execute('spUpsertIncidentEscalationPathway');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getIncidentMemberTypes():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intIncidentMemberTypeID, chvIncidentMemberType, chvIncidentMemberTypeDescription, FORMAT(dteIncidentMemberTypeModified, 'dd-MMM-yyyy') AS dteIncidentMemberTypeModified FROM tlkpIncidentMemberTypes ORDER BY chvIncidentMemberType;`;
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
     * @param intIncidentMemberTypeID primary key for database table tlkpIncidentMemberTypes
     * @param chvIncidentMemberType string value for incident member type
     * @param chvIncidentMemberTypeDescription string value for incident member type description
     * @returns boolean true for successful operation
     */
    public upsertIncidentMemberTypes(intIncidentMemberTypeID = 0, chvIncidentMemberType:string = null, chvIncidentMemberTypeDescription:string = null):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (!Number.isInteger(intIncidentMemberTypeID)) {
                reject('Invalid intIncidentMemberTypeID');
                return;
            }
            
            if (chvIncidentMemberType == null || chvIncidentMemberType.trim().length == 0) {
                reject('Invalid chvIncidentEscalationPathway information');
                return;
            }

            const queryRequest = new sql.Request();
            queryRequest.input('intIncidentMemberTypeID', sql.Int, intIncidentMemberTypeID); 
            queryRequest.input('chvIncidentMemberType', sql.NVarChar, chvIncidentMemberType);
            queryRequest.input('chvIncidentMemberTypeDescription', sql.NVarChar, chvIncidentMemberTypeDescription);
            this.pool.then(() => {
                return queryRequest.execute('spUpsertIncidentMemberTypes');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getIncidentOutcomes():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intIncidentOutcomeID, chvIncidentOutcome, chvIncidentOutcomeDescription, FORMAT(dteIncidentOutcomeModified, 'dd-MMM-yyyy') AS dteIncidentOutcomeModified FROM tlkpIncidentOutcomes ORDER BY chvIncidentOutcome;`;
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

    public upsertIncidentOutcome(intIncidentOutcomeID = 0, chvIncidentOutcome:string = null, chvIncidentOutcomeDescription:string = null):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (!Number.isInteger(intIncidentOutcomeID)) {
                reject('Invalid intIncidentOutcomeID');
                return;
            }
            
            if (chvIncidentOutcome == null || chvIncidentOutcome.trim().length == 0) {
                reject('Invalid chvIncidentOutcome information');
                return;
            }

            const queryRequest = new sql.Request();
            queryRequest.input('intIncidentOutcomeID', sql.Int, intIncidentOutcomeID); 
            queryRequest.input('chvIncidentOutcome', sql.NVarChar, chvIncidentOutcome);
            queryRequest.input('chvIncidentOutcomeDescription', sql.NVarChar, chvIncidentOutcomeDescription);
            this.pool.then(() => {
                return queryRequest.execute('spUpsertIncidentOutcome');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getIncidentRootCauses():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intIncidentRootCauseID, chvIncidentRootCause, chvIncidentRootCauseDescription, FORMAT(dteIncidentRootCauseModified, 'dd-MMM-yyyy') AS dteIncidentRootCauseModified FROM tlkpIncidentRootCauses ORDER BY chvIncidentRootCause;`;
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
     * creates/update record in tlkpIncidentRootCauses database table
     * @param intIncidentRootCauseID primary key for tlkpIncidentRootCauses 0 for new record, else update existing record
     * @param chvIncidentRootCause string value for incident root cause
     * @param chvIncidentRootCauseDescription string value for root cause description
     * @returns boolean true for successful operation
     */
    public upsertIncidentRootCause(intIncidentRootCauseID = 0, chvIncidentRootCause:string = null, chvIncidentRootCauseDescription:string = null):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (!Number.isInteger(intIncidentRootCauseID)) {
                reject('Invalid intIncidentRootCauseID');
                return;
            }
            
            if (chvIncidentRootCause == null || chvIncidentRootCause.trim().length == 0) {
                reject('Invalid chvIncidentRootCause information');
                return;
            }

            const queryRequest = new sql.Request();
            queryRequest.input('intIncidentRootCauseID', sql.Int, intIncidentRootCauseID); 
            queryRequest.input('chvIncidentRootCause', sql.NVarChar, chvIncidentRootCause);
            queryRequest.input('chvIncidentRootCauseDescription', sql.NVarChar, chvIncidentRootCauseDescription);
            this.pool.then(() => {
                return queryRequest.execute('spUpsertIncidentRootCause');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getIncidentStatus():Promise<Array<Object>>{
        return new Promise((resolve, reject) => {
            let query = `SELECT intIncidentStatusID, chvIncidentStatus, FORMAT(dteIncidentStatusModified, 'dd-MMM-yyyy') AS dteIncidentStatusModified FROM tlkpIncidentStatus ORDER BY chvIncidentStatus;`;
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
     * Creates/Update record in tlkpIncidentStatus database table
     * 
     * @param intIncidentStatusID primary key for tlkpIncidentStatus, 0 for new record, else update existing record
     * @param chvIncidentStatus string value for the status
     * @returns boolean true for successful operation
     */
    public upsertIncidentStatus(intIncidentStatusID = 0, chvIncidentStatus:string = null):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (!Number.isInteger(intIncidentStatusID)) {
                reject('Invalid intIncidentStatusID');
                return;
            }
            
            if (chvIncidentStatus == null || chvIncidentStatus.trim().length == 0) {
                reject('Invalid chvIncidentStatus information');
                return;
            }

            const queryRequest = new sql.Request();
            queryRequest.input('intIncidentStatusID', sql.Int, intIncidentStatusID); 
            queryRequest.input('chvIncidentStatus', sql.NVarChar, chvIncidentStatus);
           
            this.pool.then(() => {
                return queryRequest.execute('spUpsertIncidentStatus');
            })
            .then(() => {
                resolve(true);
            })
            .catch((e) => {
                reject(e);
            });
        });
    }

    public getIncidentSeverities():Promise<Array<Object>>{
        return new Promise((resolve, reject) => { 
            let query = `SELECT intIncidentSeverityID, chvIncidentSeverity, chvIncidentSeverityDescription, FORMAT(dteIncidentSeverityModified, 'dd-MMM-yyyy') AS dteIncidentSeverityModified FROM tlkpIncidentSeverities ORDER BY chvIncidentSeverity;`;
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
     * Creates/update record in tlkpIncidentSeverities database table
     * @param intIncidentSeverityID primary key for tlkpIncidentSeverities, 0 for new record, else update existing record
     * @param chvIncidentSeverity string value for severity level
     * @param chvIncidentSeverityDescription string value for severity level description
     * @returns boolean true for successful operation
     */
    public upsertIncidentSeverity(intIncidentSeverityID = 0, chvIncidentSeverity:string = null, chvIncidentSeverityDescription:string = null):Promise<boolean>{
        return new Promise((resolve, reject) => {
            if (!Number.isInteger(intIncidentSeverityID)) {
                reject('Invalid intIncidentSeverityID');
                return;
            }
            
            if (chvIncidentSeverity == null || chvIncidentSeverity.trim().length == 0) {
                reject('Invalid chvIncidentSeverity information');
                return;
            }

            const queryRequest = new sql.Request();
            queryRequest.input('intIncidentSeverityID', sql.Int, intIncidentSeverityID); 
            queryRequest.input('chvIncidentSeverity', sql.NVarChar, chvIncidentSeverity);
            queryRequest.input('chvIncidentSeverityDescription', sql.NVarChar, chvIncidentSeverityDescription);
            this.pool.then(() => {
                return queryRequest.execute('spUpsertIncidentSeverity');
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
        }); 
    } 
}
