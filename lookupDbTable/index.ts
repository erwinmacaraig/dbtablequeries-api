import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DbTableOperator } from "../models/DbTableOperator";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let chvTableName = '';    
    let dbTableOperator = new DbTableOperator();
    let errorMessages:Array<Object> = [];

    if(req.query.chvTableName || (req.body && req.body.chvTableName)) {
        chvTableName = (req.query.chvTableName || (req.body && req.body.chvTableName));        

        switch(chvTableName) {
            case 'tlkpAccountFundingDetails':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getAccountFundingDetails();
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: result
                        }; 
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                } else if (req.method === 'POST') {
                    // check for REQUIRED post parameters are chvAccountFundingDetail and intAccountFundingDetailID
                    let intAccountFundingDetailID = 0;
                    let chvAccountFundingDetail:string;
                    if (req.body.intAccountFundingDetailID && Number.isInteger(+req.body.intAccountFundingDetailID)){
                        intAccountFundingDetailID = +req.body.intAccountFundingDetailID;
                    }
                    if (req.body.chvAccountFundingDetail && (req.body.chvAccountFundingDetail as string).trim().length > 0) {
                        chvAccountFundingDetail = (req.body.chvAccountFundingDetail as string).trim();
                    } else {
                        context.res = {
                            status: 400,
                            body: 'Invalid Account Funding Detail Information'
                        }; 
                        return;
                    }
                    try {
                        await dbTableOperator.upsertAccountFundingDetail(intAccountFundingDetailID, chvAccountFundingDetail);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Account funding detail successfully processed'
                        }; 

                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }
                    

                }
                

                break;
            case 'tblAccountFundingEventTypes':
                if (req.method === 'GET') {
                    let result = await dbTableOperator.getAccountFundingEventTypes();
                    await dbTableOperator.closeConnection();
                    context.res = {
                        status: 200,
                        body: result
                    }; 
                    return;
                } else if (req.method === 'POST') {
                    
                }
                break;
            case 'tlkpAccountFundingTypes':
                if (req.method === 'GET') {
                    let result = await dbTableOperator.getAccountFundingTypes();
                    await dbTableOperator.closeConnection();
                    context.res = {
                        status: 200,
                        body: result
                    }; 
                } else if (req.method === 'POST') {
                    // check required parameters
                    let intAccountFundingTypeID = 0;
                    let chvAccountFundingType:string;
                    if(req.body.intAccountFundingTypeID && Number.isInteger(+req.body.intAccountFundingTypeID)){
                        intAccountFundingTypeID = +req.body.intAccountFundingTypeID;
                    }
                    if (req.body.chvAccountFundingType && (req.body.chvAccountFundingType as string).trim().length > 0) {
                        chvAccountFundingType = req.body.chvAccountFundingType;
                    } else {
                        context.res = {
                            status: 400,
                            body: 'Invalid Account Funding Type Information'
                        }; 
                        return;
                    }
                    try {
                        await dbTableOperator.upsertAccountFundingType(intAccountFundingTypeID, chvAccountFundingType);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Account funding type successfully processed'
                        }; 
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                }
                break;
            case 'tlkpAccountPaymentTypes':
                if (req.method === 'GET') {
                    let result = await dbTableOperator.getAccountPaymentTypes();
                    await dbTableOperator.closeConnection();
                    context.res = {
                        status: 200,
                        body: result
                    }; 
                } else if (req.method === 'POST') {
                    let intAccountPaymentTypeID = 0;
                    let chvAccountPaymentType:string;

                    if (req.body.intAccountPaymentTypeID && Number.isInteger(+req.body.intAccountPaymentTypeID)) {
                        intAccountPaymentTypeID = +req.body.intAccountPaymentTypeID
                    }
                    if (req.body.chvAccountPaymentType && (req.body.chvAccountPaymentType as string).trim().length > 0) {
                        chvAccountPaymentType = (req.body.chvAccountPaymentType as string).trim();
                    } else {
                        context.res = {
                            status: 400,
                            body: 'Invalid Account Payment Type Information'
                        };
                        return;
                    }
                    try {
                        await dbTableOperator.upsertAccountPaymentType(intAccountPaymentTypeID, chvAccountPaymentType);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Account Payment Type Successfully processed'
                        }; 
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                    
                }
                break;
            case 'tlkpApplicationRequirements':
                if (req.method === 'GET') {
                    let result = await dbTableOperator.getApplicationRequirements();
                    await dbTableOperator.closeConnection();
                    context.res = {
                        status: 200,
                        body: result
                    }; 
                } else if (req.method === 'POST') {
                    let intApplicationRequirementID = 0;
                    let chvApplicationRequirement:string;
                    if(req.body.intApplicationRequirementID && Number.isInteger(+req.body.intApplicationRequirementID)){
                        intApplicationRequirementID = +req.body.intApplicationRequirementID
                    }
                    if (req.body.chvApplicationRequirement && (req.body.chvApplicationRequirement as string).trim().length > 0) {
                        chvApplicationRequirement = (req.body.chvApplicationRequirement as string).trim();
                    } else {
                        context.res = {
                            status: 400,
                            body: 'Invalid Application Requirement Information'
                        };
                        return;
                    }
                    try {
                        await dbTableOperator.upsertApplicationRequirement(intApplicationRequirementID, chvApplicationRequirement);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Application Requirement successfully processed'
                        }; 
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }


                }
                break;
            case 'tlkpApplicationStatus':
                if (req.method === 'GET') {
                    let result = await dbTableOperator.getApplicationStatus();
                    await dbTableOperator.closeConnection();
                    context.res = {
                        status: 200,
                        body: result
                    }; 
                } else if (req.method === 'POST') {

                    let intApplicationStatusID = 0;
                    let chvApplicationStatus:string;

                    // checks for inputs
                    if (req.body.intApplicationStatusID && Number.isInteger(+req.body.intApplicationStatusID)) {
                        intApplicationStatusID = +req.body.intApplicationStatusID;                        
                    }
                    if (req.body.chvApplicationStatus && (req.body.chvApplicationStatus as string).trim().length > 0) {
                        chvApplicationStatus = (req.body.chvApplicationStatus as string).trim();
                    } else {
                        context.res = {
                            status: 400,
                            body: 'Invalid Application Status Information'
                        };
                        return;
                    }
                    try {
                        await dbTableOperator.upsertApplicationStatus(intApplicationStatusID, chvApplicationStatus);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Application Status Information Successfully processed'
                        }; 
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                }
                break; 
            case 'tlkpAssessmentCategories':
                if (req.method === 'GET') {
                    let result = await dbTableOperator.getAssessmentCategories();
                    await dbTableOperator.closeConnection();
                    context.res = {
                        status: 200,
                        body: result
                    }; 
                } else if (req.method === 'POST') {
                    let intAssessmentCategoryID = 0;
                    let chvAssessmentCategory:string;
                    if (req.body.intAssessmentCategoryID && Number.isInteger(+req.body.intAssessmentCategoryID)) {
                        intAssessmentCategoryID = +req.body.intAssessmentCategoryID
                    }
                    if (req.body.chvAssessmentCategory && (req.body.chvAssessmentCategory as string).trim().length > 0) {
                        chvAssessmentCategory = (req.body.chvAssessmentCategory as string).trim();
                    } else {
                        context.res = {
                            status: 400,
                            body: 'Invalid Assessment Category Information'
                        };
                        return;
                    }
                    try {
                        await dbTableOperator.upsertAssessmentCategory(intAssessmentCategoryID, chvAssessmentCategory);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Assessment Category Successfully processed'
                        }; 
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                }
                break;                
            case 'tblSchemaTables':
                if (req.method === 'GET') {
                    let result = await dbTableOperator.getSchemaTables();
                    await dbTableOperator.closeConnection();
                    context.res = {
                        status: 200,
                        body: result
                    }; 
                } 
                break; 
            case 'tlkpAssessmentCategoryTypes':
                if (req.method === 'GET') {
                    let result = await dbTableOperator.getAssessmentCategoryTypes();
                    await dbTableOperator.closeConnection();
                    context.res = {
                        status: 200,
                        body: result
                    }; 
                } else if (req.method === 'POST') {
                    let intAssessmentCategoryTypeID = 0;
                    let chvAssessmentCategoryType:string;
                    
                    if (req.body.intAssessmentCategoryTypeID && Number.isInteger(+req.body.intAssessmentCategoryTypeID)) {
                        intAssessmentCategoryTypeID = +req.body.intAssessmentCategoryTypeID
                    }
                    if (req.body.chvAssessmentCategoryType && (req.body.chvAssessmentCategoryType as string).trim().length > 0) {
                        chvAssessmentCategoryType = (req.body.chvAssessmentCategoryType as string).trim();
                    } else {
                        context.res = {
                            status: 400,
                            body: 'Invalid Assessment Category Information'
                        };
                        return;
                    }                    
                    
                    try {
                        await dbTableOperator.upsertAssessmentCategoryType(intAssessmentCategoryTypeID,chvAssessmentCategoryType);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Assessment Category Type Successfully processed'
                        }; 
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }
                }
                break;
            case 'tlkpAssessmentChoiceOptions':
                if (req.method === 'GET') {
                    let result = await dbTableOperator.getAssessmentChoiceOptions();
                    await dbTableOperator.closeConnection();
                    context.res = {
                        status: 200,
                        body: result
                    }; 
                } else if (req.method === 'POST') {
                    let intAssessmentChoiceOptionID = 0;
                    let chvAssessmentChoiceOption:string;                    
                    if (req.body.intAssessmentChoiceOptionID && Number.isInteger(+req.body.intAssessmentChoiceOptionID)) {
                        intAssessmentChoiceOptionID = +req.body.intAssessmentChoiceOptionID;
                    }
                    if (req.body.chvAssessmentChoiceOption && (req.body.chvAssessmentChoiceOption as string).trim().length > 0) {
                        chvAssessmentChoiceOption = (req.body.chvAssessmentChoiceOption as string).trim();
                    } else {
                        context.res = {
                            status: 400,
                            body: 'Invalid  Information'
                        };
                        return;
                    }
                    
                    try {
                        await dbTableOperator.upsertAssessmentChoiceOption(intAssessmentChoiceOptionID,chvAssessmentChoiceOption);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Assessment Option Choice Successfully processed'
                        }; 
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }
                }
                break;
            case 'tlkpAssessmentChoices':
                if (req.method === 'GET') {
                    let result = await dbTableOperator.getAssessmentChoices();
                    await dbTableOperator.closeConnection();
                    context.res = {
                        status: 200,
                        body: result
                    };
                } else if (req.method === 'POST') {
                    let intAssessmentChoiceID = 0;
                    let chvAssessmentChoice:string;
                    
                    if (req.body.intAssessmentChoiceID && Number.isInteger(+req.body.intAssessmentChoiceID)) {
                        intAssessmentChoiceID = +req.body.intAssessmentChoiceID;
                    }
                    if (req.body.chvAssessmentChoice && (req.body.chvAssessmentChoice as string).trim().length > 0) {
                        chvAssessmentChoice = (req.body.chvAssessmentChoice as string).trim();
                    } else {
                        context.res = {
                            status: 400,
                            body: 'Invalid  Information'
                        };
                        return;
                    }                    
                    try {
                        await dbTableOperator.upsertAssessmentChoice(intAssessmentChoiceID, chvAssessmentChoice);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Assessment Choice Option Successfully processed'
                        }; 
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                }
                break;
            case 'tblAssessmentSchemaDetails':
                if (req.method === 'GET') {
                    let result = await dbTableOperator.getAssessmentSchemaDetails();
                    await dbTableOperator.closeConnection();
                    context.res = {
                        status: 200,
                        body: result
                    };
                } else if (req.method === 'POST') {
                    let intAssessmentSchemaDetailID = 0;
                    let intTableID = 0;
                    let intColumnID = 0;
                    let chvSelectStoredProcedure:string;
                    let chvUpsertStoredProcedure:string;  
                    let chvProfilePage:string;                  
                    let intPersonID = 0;

                    if (req.body.intAssessmentSchemaDetailID && Number.isInteger(+req.body.intAssessmentSchemaDetailID)) {
                        intAssessmentSchemaDetailID = +req.body.intAssessmentSchemaDetailID;
                    }

                    if (req.body.chvProfilePage && (req.body.chvProfilePage as string).trim().length > 0) {
                        chvProfilePage = (req.body.chvProfilePage as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvProfilePage submitted"
                        });
                    }
                    if (req.body.chvSelectStoredProcedure && (req.body.chvSelectStoredProcedure as string).trim().length > 0) {
                        chvSelectStoredProcedure = (req.body.chvSelectStoredProcedure as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvSelectStoredProcedure submitted"
                        });
                    }
                    if (req.body.chvUpsertStoredProcedure && (req.body.chvUpsertStoredProcedure as string).trim().length > 0) {
                        chvUpsertStoredProcedure = (req.body.chvUpsertStoredProcedure as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvUpsertStoredProcedure submitted"
                        });
                    }
                    if (req.body.intTableID && Number.isInteger(+req.body.intTableID) && +req.body.intTableID > 0) {
                        intTableID = +req.body.intTableID;
                    } else {
                        errorMessages.push({
                            error: "Invalid intTableID submitted"
                        });
                    }
                    if (req.body.intColumnID && Number.isInteger(+req.body.intColumnID) && +req.body.intColumnID > 0) {
                        intColumnID = +req.body.intColumnID;
                    } else {
                        errorMessages.push({
                            error: "Invalid intColumnID submitted"
                        });
                    }
                    if (req.body.intPersonID && Number.isInteger(+req.body.intPersonID) && +req.body.intPersonID > 0) {
                        intPersonID = +req.body.intPersonID;
                    } else {
                        errorMessages.push({
                            error: "Invalid intPersonID submitted"
                        });
                    }

                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400, 
                            body: errorMessages,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        };
                        return;
                    }
                    
                    try {
                        await dbTableOperator.upsertAssessmentSchemaDetails(
                            intAssessmentSchemaDetailID,
                            intTableID,
                            intColumnID,
                            chvSelectStoredProcedure,
                            chvUpsertStoredProcedure,
                            chvProfilePage,
                            intPersonID
                        );
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Assessment Schema Details Successfully Processed'
                        };
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }
                }
                break;
            case 'tblAssessmentScoreLevels':
                if (req.method === 'GET') {
                    let result = await dbTableOperator.getAssessmentScoreLevels();
                    await dbTableOperator.closeConnection();
                    context.res = {
                        status: 200,
                        body: result
                    };
                } else if (req.method === 'POST') {
                    let intAssessmentScoreLevelID = 0;
                    let intAssessmentID = 0;
                    let chvAssessmentScoreLevel:string = '';
                    let intAssessmentScoreLevelMin = 0;
                    let intAssessmentScoreLevelMax = 0;
                    let intModifiedByID = 0;
                    if (req.body.intAssessmentScoreLevelID && Number.isInteger(+req.body.intAssessmentScoreLevelID)) {
                        intAssessmentScoreLevelID = +req.body.intAssessmentScoreLevelID;
                   }
                    if (req.body.intAssessmentID && Number.isInteger(+req.body.intAssessmentID)) {
                        intAssessmentID = +req.body.intAssessmentID;
                    } else {
                        errorMessages.push({
                            error: "Invalid intAssessmentID submitted"
                        });
                    }
                    if (req.body.intModifiedByID && Number.isInteger(+req.body.intModifiedByID) && +req.body.intModifiedByID > 0) {
                        intModifiedByID = +req.body.intModifiedByID;
                    } else {
                        errorMessages.push({
                            error: "Invalid intModifiedByID submitted"
                        });
                    }
                    if (req.body.intAssessmentScoreLevelMin && Number.isInteger(+req.body.intAssessmentScoreLevelMin)) {
                        intAssessmentScoreLevelMin = +req.body.intAssessmentScoreLevelMin;
                    }
                    if (req.body.intAssessmentScoreLevelMax && Number.isInteger(+req.body.intAssessmentScoreLevelMax)) {
                        intAssessmentScoreLevelMax = +req.body.intAssessmentScoreLevelMax;
                    }
                    if (req.body.chvAssessmentScoreLevel && (req.body.chvAssessmentScoreLevel as string).trim().length > 0) {
                        chvAssessmentScoreLevel = (req.body.chvAssessmentScoreLevel as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvAssessmentScoreLevel submitted"
                        });
                    }
                    if (intAssessmentScoreLevelMin > intAssessmentScoreLevelMax) {
                        errorMessages.push({
                            error: "Invalid range intAssessmentScoreLevelMin and intAssessmentScoreLevelMax submitted"
                        });
                    }
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400, 
                            body: errorMessages,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        };
                        return;
                    }
                    /*
                    if (req.body. && Number.isInteger(+req.body.)) {
                         = +req.body.
                    }
                    if (req.body. && (req.body. as string).trim().length > 0) {
                         = (req.body. as string).trim();
                    } else {
                        context.res = {
                            status: 400,
                            body: 'Invalid  Information'
                        };
                        return;
                    }
                    */
                    try {
                        await dbTableOperator.upsertAssessmentScoreLevel(
                                intAssessmentScoreLevelID,
                                intAssessmentID,
                                chvAssessmentScoreLevel,
                                intAssessmentScoreLevelMin,
                                intAssessmentScoreLevelMax,
                                intModifiedByID
                            );
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Assessment Score Levels Successfully Processed'
                        };
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }
                }
                break;                
            case 'tlkpAssessmentSubCategories':
                if (req.method === 'GET') {
                    let result = await dbTableOperator.getAssessmentSubCategories();
                    await dbTableOperator.closeConnection();
                    context.res = {
                        status: 200,
                        body: result
                    };
                } else if (req.method === 'POST') {
                    let intAssessmentSubCategoryID = 0;
                    let chvAssessmentSubCategory = '';
                    let intAssessmentCategoryID = 0;

                    if (req.body.intAssessmentCategoryID && Number.isInteger(+req.body.intAssessmentCategoryID) && +req.body.intAssessmentCategoryID > 0) {
                        intAssessmentCategoryID = +req.body.intAssessmentCategoryID;
                    } else {
                        errorMessages.push({
                            error: 'Invalid Assessment Category ID Submitted'
                        });
                    }
                    
                    if (req.body.intAssessmentSubCategoryID && Number.isInteger(+req.body.intAssessmentSubCategoryID)) {
                        intAssessmentSubCategoryID = +req.body.intAssessmentSubCategoryID;
                    }
                    if (req.body.chvAssessmentSubCategory && (req.body.chvAssessmentSubCategory as string).trim().length > 0) {
                         chvAssessmentSubCategory = (req.body.chvAssessmentSubCategory as string).trim();
                    } else {
                        errorMessages.push({
                            error: 'Invalid Assessment Category Information Submitted'
                        });
                    }
                    
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400, 
                            body: errorMessages,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        };
                        return;
                    }
                    try {
                        await dbTableOperator.upsertAssessmentSubCategory(intAssessmentSubCategoryID, chvAssessmentSubCategory,intAssessmentCategoryID);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Assessment SubCategory Successfully Processed'
                        };
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                }
                break; 
            case 'tlkpAuditPages':
                if (req.method === 'GET') {
                    let result = await dbTableOperator.getAuditPages();
                    await dbTableOperator.closeConnection();
                    context.res = {
                        status: 200,
                        body: result
                    };
                } else if (req.method === 'POST') {
                    let intAuditPageID = 0;
                    let chvAuditPageName:string;
                    let chvAuditSection: string;
                    let chvAuditPage:string;
                    if (req.body.intAuditPageID && Number.isInteger(+req.body.intAuditPageID)) {
                        intAuditPageID = +req.body.intAuditPageID;
                    }
                    if (req.body.chvAuditPageName && (req.body.chvAuditPageName as string).trim().length > 0) {
                        chvAuditPageName = (req.body.chvAuditPageName as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvAuditPageName submitted"
                        });
                    }
                    if (req.body.chvAuditSection && (req.body.chvAuditSection as string).trim().length > 0) {
                        chvAuditSection = (req.body.chvAuditSection as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvAuditSection submitted"
                        }); 
                    }
                    if (req.body.chvAuditPage && (req.body.chvAuditPage as string).trim().length > 0) {
                        chvAuditPage = (req.body.chvAuditPage as string).trim();
                    } 
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400, 
                            body: errorMessages,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        };
                        return;
                    }
                    try {
                        await dbTableOperator.upsertAuditPage(intAuditPageID, chvAuditPageName, chvAuditSection, chvAuditPage);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Audit page successfully processed'
                        };

                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                }
                break;
            case 'tlkpCarePlanAreas':
                if (req.method === 'GET') {
                    let result = await dbTableOperator.getCarePlanAreas();
                    await dbTableOperator.closeConnection();
                    context.res = {
                        status: 200,
                        body: result
                    };
                } else if (req.method === 'POST') {
                    let intCarePlanAreaID = 0;
                    let chvCarePlanArea:string;
                    let chvCarePlanAreaDescription:string = null;
                    if (req.body.intCarePlanAreaID && Number.isInteger(+req.body.intCarePlanAreaID)) {
                        intCarePlanAreaID = +req.body.intCarePlanAreaID;
                    }
                    if (req.body.chvCarePlanAreaDescription && (req.body.chvCarePlanAreaDescription as string).trim().length > 0) {
                        chvCarePlanAreaDescription = (req.body.chvCarePlanAreaDescription as string).trim();
                    }
                    if (req.body.chvCarePlanArea && (req.body.chvCarePlanArea as string).trim().length > 0) {
                        chvCarePlanArea = (req.body.chvCarePlanArea as string).trim();
                    } else {
                        errorMessages.push({
                            error: 'Invalid Care Plan Area submitted'
                        });
                    } 
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                    }
                    
                    try {
                        await dbTableOperator.upsertCarePlanAreas(intCarePlanAreaID, chvCarePlanArea,chvCarePlanAreaDescription);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Care Plan Area successfully processed'
                        };
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                }
                break;
            case 'tlkpContactPersonFors':
                if (req.method === 'GET') {
                    let result = await dbTableOperator.getContactPersonFors();
                    await dbTableOperator.closeConnection();
                    context.res = {
                        status: 200,
                        body: result
                    };
                } else if (req.method === 'POST') {
                    let intContactPersonForID = 0;
                    let chvContactPersonFor:string;
                    
                    if (req.body.intContactPersonForID && Number.isInteger(+req.body.intContactPersonForID)) {
                        intContactPersonForID = +req.body.intContactPersonForID;
                    }
                    if (req.body.chvContactPersonFor && (req.body.chvContactPersonFor as string).trim().length > 0) {
                        chvContactPersonFor = (req.body.chvContactPersonFor as string).trim();
                    } else {
                        errorMessages.push({
                            error: 'Invalid chvContactPersonFor Submitted'
                        });                        
                    }
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return;
                    }
                    try {
                        await dbTableOperator.upsertContactPersonFors(intContactPersonForID, chvContactPersonFor);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Contact Person Fors successfully processed'
                        };

                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                }
                break;
            case 'tlkpContactPersonTypes':
                if (req.method === 'GET') {
                    let result = await dbTableOperator.getContactPersonTypes();
                    await dbTableOperator.closeConnection();
                    context.res = {
                        status: 200,
                        body: result
                    };
                } else if (req.method === 'POST') {
                    let intContactPersonTypeID = 0;
                    let chvContactPersonType:string;
                    if (req.body.intContactPersonTypeID && Number.isInteger(+req.body.intContactPersonTypeID)) {
                        intContactPersonTypeID = +req.body.intContactPersonTypeID;
                    }
                    if (req.body.chvContactPersonType && (req.body.chvContactPersonType as string).trim().length > 0) {
                        chvContactPersonType = (req.body.chvContactPersonType as string).trim();
                    } else {
                        errorMessages.push({
                            error: 'Invalid chvContactPersonType Submitted'
                        });                        
                    }
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return;
                    }
                    try {
                        await dbTableOperator.upsertContactPersonTypes(intContactPersonTypeID, chvContactPersonType);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Contact Person Type successfully processed'
                        };
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                }
                break;
            case 'tlkpContactSupplierFors':
                if (req.method === 'GET') {
                    let result = await dbTableOperator.getContactSupplierFors();
                    await dbTableOperator.closeConnection();
                    context.res = {
                        status: 200,
                        body: result
                    };
                } else if (req.method === 'POST') {
                    let intContactSupplierForID = 0;
                    let chvContactSupplierFor:string;
                    
                    if (req.body.intContactSupplierForID && Number.isInteger(+req.body.intContactSupplierForID)) {
                        intContactSupplierForID = +req.body.intContactSupplierForID;
                    }
                    if (req.body.chvContactSupplierFor && (req.body.chvContactSupplierFor as string).trim().length > 0) {
                        chvContactSupplierFor = (req.body.chvContactSupplierFor as string).trim();
                    } else {
                        errorMessages.push({
                            error: 'Invalid chvContactSupplierFor submitted'
                        });
                    }
                    
                    try {
                        await dbTableOperator.upsertContactSupplierFors(intContactSupplierForID, chvContactSupplierFor);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Contact Suppliers For successfully processed'
                        };

                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }
                }
                break;
            case 'tlkpCountries':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getCountries();
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: result
                        };
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                    }
                    

                } else if (req.method === 'POST') {
                    let intCountryID = 0;
                    let chvCountryName:string;
                    let chvNationality:string;
                    let chvCountryFlagName:string;
                    
                    if (req.body.intCountryID && Number.isInteger(+req.body.intCountryID)) {
                        intCountryID = +req.body.intCountryID;
                    }
                    
                    if (req.body.chvCountryName && (req.body.chvCountryName as string).trim().length > 0) {
                        chvCountryName = (req.body.chvCountryName as string).trim();
                    } else {
                        errorMessages.push({
                            error: 'Invalid chvCountryName submitted'
                        });
                    }
                    if (req.body.chvNationality && (req.body.chvNationality as string).trim().length > 0) {
                        chvNationality = (req.body.chvNationality as string).trim();
                    } else {
                        errorMessages.push({
                            error: 'Invalid chvNationality submitted'
                        });
                    }
                    if (req.body.chvCountryFlagName && (req.body.chvCountryFlagName as string).trim().length > 0) {
                            chvCountryFlagName = (req.body.chvCountryFlagName as string).trim();
                    } else {
                        errorMessages.push({
                            error: 'Invalid chvCountryFlagName submitted'
                        });
                    }
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return;
                    }
                    try {
                        await dbTableOperator.upsertCountries(intCountryID, chvCountryName, chvNationality, chvCountryFlagName);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Country operation successful'
                        };
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                }
                break;
            case 'tlkpContactSupplierTypes':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getContactSupplierTypes();
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: result
                        };
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                    }
                } else if (req.method === 'POST') {
                    let intContactSupplierTypeID = 0;
                    let chvContactSupplierType:string;
                    if (req.body.intContactSupplierTypeID && Number.isInteger(+req.body.intContactSupplierTypeID)) {
                        intContactSupplierTypeID = +req.body.intContactSupplierTypeID;
                    }
                    if (req.body.chvContactSupplierType && (req.body.chvContactSupplierType as string).trim().length > 0) {
                        chvContactSupplierType = (req.body.chvContactSupplierType as string).trim();
                    } else {
                        errorMessages.push({
                            error: 'Invalid chvContactSupplierType submitted'
                        });
                    }
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return;
                    }
                    try {
                        await dbTableOperator.upsertContactSupplierTypes(intContactSupplierTypeID, chvContactSupplierType);
                        await dbTableOperator.closeConnection();

                        context.res = {
                            status: 200,
                            body: 'Contact Supplier operation successful'
                        };
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                }
                break;
            case 'tblDepartments':
                if (req.method === 'GET') {
                    let tz = null;
                    if (req.query.tz && Number.isInteger(+req.query.tz)) {
                        tz = +req.body.tz;
                    }
                    try {
                        let result = await dbTableOperator.getDepartments(tz);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: result
                        };
                    } catch(e){
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                } else if (req.method === 'POST') {
                    let intDepartmentID = 0;
                    let chvDepartmentName:string;
                    let intDepartmentIsActiveID = 1;
                    let intDepartmentStaffRoleID = 0;
                    let intDepartmentManagerID = 0;
                    let chvDepartmentTeamsURL:string;
                    let chvDepartmentEmailAddress:string = null;
                    let chvDepartmentDescription:string = null;
                    let intPersonID = 0

                    if (req.body.intDepartmentID && Number.isInteger(+req.body.intDepartmentID)) {
                        intDepartmentID = +req.body.intDepartmentID;
                    }
                    if (req.body.intDepartmentIsActiveID && Number.isInteger(+req.body.intDepartmentIsActiveID)) {
                        intDepartmentIsActiveID = +req.body.intDepartmentIsActiveID;
                    }
                    if (req.body.chvDepartmentEmailAddress && (req.body.chvDepartmentEmailAddress as string).trim().length > 0) {
                        chvDepartmentEmailAddress = (req.body.chvDepartmentEmailAddress as string).trim();
                    }
                    if (req.body.chvDepartmentDescription && (req.body.chvDepartmentDescription as string).trim().length > 0) {
                        chvDepartmentDescription = (req.body.chvDepartmentDescription as string).trim();
                    }

                    if (req.body.intPersonID && Number.isInteger(+req.body.intPersonID) && +req.body.intPersonID > 0) {
                        intPersonID = +req.body.intPersonID;
                    } else {
                        errorMessages.push({
                            error: "Invalid intPersonID submitted"
                        });
                    }
                    if (req.body.intDepartmentStaffRoleID && Number.isInteger(+req.body.intDepartmentStaffRoleID) && +req.body.intDepartmentStaffRoleID > 0) {
                        intDepartmentStaffRoleID = +req.body.intDepartmentStaffRoleID;
                    } else {
                        errorMessages.push({
                            error: "Invalid intDepartmentStaffRoleID submitted"
                        });
                    }
                    if (req.body.intDepartmentManagerID && Number.isInteger(+req.body.intDepartmentManagerID) && +req.body.intDepartmentManagerID > 0) {
                        intDepartmentManagerID = +req.body.intDepartmentManagerID;
                    } else {
                        errorMessages.push({
                            error: "Invalid intDepartmentManagerID submitted"
                        });
                    }

                    if (req.body.chvDepartmentName && (req.body.chvDepartmentName as string).trim().length > 0) {
                        chvDepartmentName = (req.body.chvDepartmentName as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvDepartmentName submitted"
                        });
                    }
                    if (req.body.chvDepartmentTeamsURL && (req.body.chvDepartmentTeamsURL as string).trim().length > 0) {
                        chvDepartmentTeamsURL = (req.body.chvDepartmentTeamsURL as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvDepartmentTeamsURL submitted"
                        });
                    }
                    /*
                    if (req.body. && Number.isInteger(+req.body.)) {
                        = +req.body.;
                    }
                    if (req.body. && (req.body. as string).trim().length > 0) {
                        = (req.body. as string).trim();
                    }
                    */
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return;
                    }
                    try {
                        await dbTableOperator.upsertDepartment(
                            intDepartmentID,
                            chvDepartmentName,
                            intDepartmentIsActiveID,
                            intDepartmentStaffRoleID,
                            intDepartmentManagerID,
                            chvDepartmentTeamsURL,
                            chvDepartmentEmailAddress,
                            chvDepartmentDescription,
                            intPersonID
                        );
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Department operation successful'
                        };

                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                }
                break;
            case 'tlkpEmploymentClassifications':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getEmploymentClassifications();
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: result
                        };
                    } catch(e){
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                } else if (req.method === 'POST') {
                    let intEmploymentClassificationID = 0;
                    let chvEmploymentClassification:string;
                    let chvEmploymentClassificationAbrv:string;
                    
                    if (req.body.intEmploymentClassificationID && Number.isInteger(+req.body.intEmploymentClassificationID)) {
                        intEmploymentClassificationID = +req.body.intEmploymentClassificationID;
                    }
                    if (req.body.chvEmploymentClassification && (req.body.chvEmploymentClassification as string).trim().length > 0) {
                        chvEmploymentClassification = (req.body.chvEmploymentClassification as string).trim();
                    } else {
                        errorMessages.push({
                            error: 'Invalid chvEmploymentClassification submitted'
                        });
                    }
                    if (req.body.chvEmploymentClassificationAbrv && (req.body.chvEmploymentClassificationAbrv as string).trim().length > 0) {
                        chvEmploymentClassificationAbrv = (req.body.chvEmploymentClassificationAbrv as string).trim();
                    }else {
                        errorMessages.push({
                            error: 'Invalid chvEmploymentClassificationAbrv submitted'
                        });
                    }
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return;
                    }

                    try {
                        await dbTableOperator.upsertEmploymentClassification(intEmploymentClassificationID, chvEmploymentClassification, chvEmploymentClassificationAbrv);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Employment Classifications operation successful'
                        };
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                }
                break;
            case 'tlkpEmploymentTypes':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getEmploymentTypes();
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: result
                        };

                    } catch(e){
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                } else if (req.method === 'POST') {
                    let intEmploymentTypeID = 0;
                    let intEmploymentClassificationID = 0;
                    let chvEmploymentType:string;
                    let intGrade = 0;

                    if (req.body.intEmploymentTypeID && Number.isInteger(+req.body.intEmploymentTypeID)) {
                        intEmploymentTypeID = +req.body.intEmploymentTypeID;
                    }
                    if (req.body.intGrade && Number.isInteger(+req.body.intGrade)) {
                        intGrade = +req.body.intGrade;
                    }
                    if (req.body.intEmploymentClassificationID && Number.isInteger(+req.body.intEmploymentClassificationID)) {
                        intEmploymentClassificationID = +req.body.intEmploymentClassificationID;
                    } else {
                        errorMessages.push({
                            error: 'Invalid intEmploymentClassificationID submitted'
                        });
                    }
                    if (req.body.chvEmploymentType && (req.body.chvEmploymentType as string).trim().length > 0) {
                        chvEmploymentType = (req.body.chvEmploymentType as string).trim();
                    } else {
                        errorMessages.push({
                            error: 'Invalid chvEmploymentType submitted'
                        });
                    }
                    

                    /*
                    if (req.body. && Number.isInteger(+req.body.)) {
                        = +req.body.;
                    }
                    if (req.body. && (req.body. as string).trim().length > 0) {
                        = (req.body. as string).trim();
                    }
                    */
                    try {
                        await dbTableOperator.upsertEmploymentType(
                            intEmploymentTypeID,
                            intEmploymentClassificationID,
                            chvEmploymentType,
                            intGrade
                        );
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Employment Type Operation successful'
                        };
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                }
                break;
            case 'tlkpFileGroups':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getFileGroups();
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: result
                        };

                    } catch(e){
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                } else if (req.method === 'POST') {
                    let intFileGroupID = 0;
                    let chvFileGroupName:string;
                    if (req.body.intFileGroupID && Number.isInteger(+req.body.intFileGroupID)) {
                        intFileGroupID = +req.body.intFileGroupID;
                    }
                    if (req.body.chvFileGroupName && (req.body.chvFileGroupName as string).trim().length > 0) {
                        chvFileGroupName = (req.body.chvFileGroupName as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvFileGroupName submitted"
                        });                        
                    }
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return; 
                    }

                    
                    try {
                        await dbTableOperator.upsertFileGroups(intFileGroupID, chvFileGroupName);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'FileGroup operation successful'
                        };
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                }
                break;                          
            case 'tblFundingDetails':
                if (req.method === 'GET') {
                    try {
                        let result;
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: result
                        };

                    } catch(e){
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                } else if (req.method === 'POST') {
                    /*
                    if (req.body. && Number.isInteger(+req.body.)) {
                        = +req.body.;
                    }
                    if (req.body. && (req.body. as string).trim().length > 0) {
                        = (req.body. as string).trim();
                    }
                    */
                    try {

                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                }
                break;
            case 'tblGroupServices':
                if (req.method === 'GET') {
                    try {
                        let result;
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: result
                        };

                    } catch(e){
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                } else if (req.method === 'POST') {
                    /*
                    if (req.body. && Number.isInteger(+req.body.)) {
                        = +req.body.;
                    }
                    if (req.body. && (req.body. as string).trim().length > 0) {
                        = (req.body. as string).trim();
                    }
                    */
                    try {

                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                }
                break;
            //=======================================================================    
            case '':
                if (req.method === 'GET') {
                    try {
                        let result;
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: result
                        };

                    } catch(e){
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                } else if (req.method === 'POST') {
                    /*
                    if (req.body. && Number.isInteger(+req.body.)) {
                        = +req.body.;
                   }
                   if (req.body. && (req.body. as string).trim().length > 0) {
                        = (req.body. as string).trim();
                   }
                   */
                    try {

                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                }
                break;                                                             
            default:
                context.res = {
                    status: 400,
                    body: 'Cannot find supplied table name'
                }; 
            break;
        }


    } else {
        context.res = {
            status: 400,
            body: 'Invalid table'
        };
    }

};

export default httpTrigger;