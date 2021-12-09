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
     * closes database connection
     */
     public closeConnection() {
        this.pool.then((pool) => {
            pool.close();
        })
    }
}