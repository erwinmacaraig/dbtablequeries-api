import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { DbTableOperator } from "../models/DbTableOperator";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    let chvTableName = '';    
    let dbTableOperator = new DbTableOperator(context);
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
                        let result = await dbTableOperator.getFundingDetails();
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
                    let intFundingID = 0;
                    let intAccountFundingTypeID = 0; // REFERENCES dbo.tlkpAccountFundingTypes (intAccountFundingTypeID)
                    let intAccountFundingDetailID = 0; //REFERENCES dbo.tlkpAccountFundingDetails (intAccountFundingDetailID)

                    let amtCaseManagementFee:number = 0.0; // Case Management Fee
                    let amtInvoiceDiscount:number = 0.0; // Invoice Discount
                    let amtFundingValue:number = 0.0; // Funding Value
                    let intPersonID = 0; //REFERENCES dbo.tblPersons (intPersonID)

                    if (req.body.intFundingID && Number.isInteger(+req.body.intFundingID)) {
                        intFundingID = +req.body.intFundingID;
                    }
                    
                    if (req.body.intAccountFundingTypeID && Number.isInteger(+req.body.intAccountFundingTypeID) && +req.body.intAccountFundingTypeID > 0) {
                        intAccountFundingTypeID = +req.body.intAccountFundingTypeID;
                    } else {
                        errorMessages.push({
                            error: 'Invalid intAccountFundingTypeID submitted'
                        });
                    }
                    if (req.body.intAccountFundingDetailID && Number.isInteger(+req.body.intAccountFundingDetailID) && +req.body.intAccountFundingDetailID > 0) {
                        intAccountFundingDetailID = +req.body.intAccountFundingDetailID;
                    } else {
                        errorMessages.push({
                            error: 'Invalid intAccountFundingDetailID submitted'
                        });
                    }
                    if (req.body.intPersonID && Number.isInteger(+req.body.intPersonID) && +req.body.intPersonID > 0) {
                        intPersonID = +req.body.intPersonID;
                    } else {
                        errorMessages.push({
                            error: 'Invalid intPersonID submitted'
                        });
                    }

                    
                    if (req.body.amtCaseManagementFee && (req.body.amtCaseManagementFee).toString().match(/[A-Za-z\-\*\$()#&@~!`\=\+\*\^\%\$]/g) == null) {
                        amtCaseManagementFee = parseFloat(req.body.amtCaseManagementFee);
                    } 

                    if (req.body.amtInvoiceDiscount && (req.body.amtInvoiceDiscount).toString().match(/[A-Za-z\-\*\$()#&@~!`\=\+\*\^\%\$]/g) == null) {
                        amtInvoiceDiscount = parseFloat(req.body.amtInvoiceDiscount);
                    } 

                    if (req.body.amtFundingValue && (req.body.amtFundingValue).toString().match(/[A-Za-z\-\*\$()#&@~!`\=\+\*\^\%\$]/g) == null) {
                        amtFundingValue = parseFloat(req.body.amtFundingValue);
                    } 


                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return; 
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
                        await dbTableOperator.upsertFundingDetails(
                            intFundingID,
                            intAccountFundingTypeID,
                            intAccountFundingDetailID,
                            amtCaseManagementFee,
                            amtInvoiceDiscount,
                            amtFundingValue,
                            intPersonID
                        );
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Funding Details operation successful'
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
            case 'tblGroupServices':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getGroupServices();
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
                    let intGroupServiceID = 0;
                    let intServiceID = 0; // REFERENCES dbo.tblServices (intServiceID)
                    let intServiceGroupID = 0; // REFERENCES dbo.tblServiceGroups (intServiceGroupID)
                    let intPersonID = 0; // REFERENCES dbo.tblPersons (intPersonID)

                    if (req.body.intServiceID && Number.isInteger(+req.body.intServiceID) && +req.body.intServiceID > 0) {
                        intServiceID = +req.body.intServiceID;
                    } else {
                        errorMessages.push({
                            error: 'Invalid intServiceID submitted'
                        });                        
                    }
                    if (req.body.intServiceGroupID && Number.isInteger(+req.body.intServiceGroupID) && +req.body.intServiceGroupID > 0) {
                        intServiceGroupID = +req.body.intServiceGroupID;
                    } else {
                        errorMessages.push({
                            error: 'Invalid intServiceGroupID submitted'
                        });                        
                    }
                    if (req.body.intPersonID && Number.isInteger(+req.body.intPersonID) && +req.body.intPersonID > 0) {
                        intPersonID = +req.body.intPersonID;
                    } else {
                        errorMessages.push({
                            error: 'Invalid intPersonID submitted'
                        });                        
                    }
                    if (req.body.intGroupServiceID && Number.isInteger(+req.body.intGroupServiceID)) {
                        intGroupServiceID = +req.body.intGroupServiceID;
                    }
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return; 
                    }

                    /*
                    if (req.body.intGroupServiceID && Number.isInteger(+req.body.intGroupServiceID)) {
                        intGroupServiceID = +req.body.intGroupServiceID;
                    }
                    if (req.body. && (req.body. as string).trim().length > 0) {
                        = (req.body. as string).trim();
                    }
                    */
                    try {
                        await dbTableOperator.upsertGroupServices(
                            intGroupServiceID,
                            intServiceID,
                            intServiceGroupID,
                            intPersonID
                        );
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Group Services operation successful'
                        };
                    } catch(e) {
                        context.log(e);
                        context.res = {
                            status: 400,
                            body: e
                        };
                        return; 
                    }

                } else if (req.method === 'DELETE') {
                    let intGroupServiceID = 0;
                    let intPersonID = 0;
                    if (req.body.intGroupServiceID && Number.isInteger(+req.body.intGroupServiceID) && +req.body.intGroupServiceID > 0) {
                        intGroupServiceID = +req.body.intGroupServiceID;
                    } else {
                        errorMessages.push({
                            error: "Invalid intGroupServiceID"
                        });
                    }
                    if (req.body.intPersonID && Number.isInteger(+req.body.intPersonID) && +req.body.intPersonID > 0) {
                        intPersonID = +req.body.intPersonID;
                    } else {
                        errorMessages.push({
                            error: 'Invalid intPersonID submitted'
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
                        await dbTableOperator.deleteGroupService(
                            intGroupServiceID,                           
                            intPersonID
                        );
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Group Services record deleted successful'
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
            case 'tlkpIncidentActions':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getIncidentActions();
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
                    let intIncidentActionID = 0;
                    let chvIncidentAction:string;
                    let chvIncidentActionDescription:string = null;
                    if (req.body.intIncidentActionID && Number.isInteger(+req.body.intIncidentActionID)) {
                        intIncidentActionID = +req.body.intIncidentActionID;
                    }
                    if (req.body.chvIncidentAction && (req.body.chvIncidentAction as string).trim().length > 0) {
                        chvIncidentAction = (req.body.chvIncidentAction as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvIncidentAction submitted"
                        });
                    }
                    if (req.body.chvIncidentActionDescription && (req.body.chvIncidentActionDescription as string).trim().length > 0) {
                        chvIncidentActionDescription = (req.body.chvIncidentActionDescription as string).trim();
                    }
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return; 
                    }
                    try {
                        await dbTableOperator.upsertIncidentAction(intIncidentActionID, chvIncidentAction, chvIncidentActionDescription);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Incident Action operation successful'
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
            case 'tblHealthConditions':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getHealthConditions();
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
                    let intHealthConditionID = 0;
                    let intIsActiveID = 1;
                    let chlHealthConditionDescription:string = null;
                    let intPersonID = 0;
                    let chvHealthConditionName:string;

                    if (req.body.intHealthConditionID && Number.isInteger(+req.body.intHealthConditionID)) {
                        intHealthConditionID = +req.body.intHealthConditionID;
                    }
                    if (req.body.intIsActiveID && Number.isInteger(+req.body.intIsActiveID) && +req.body.intIsActiveID <= 0) {
                        intIsActiveID = 0;
                    }
                    if (req.body.chlHealthConditionDescription && (req.body.chlHealthConditionDescription as string).trim().length > 0) {
                        chlHealthConditionDescription = (req.body.chlHealthConditionDescription as string).trim();
                    }
                    if (req.body.chvHealthConditionName && (req.body.chvHealthConditionName as string).trim().length > 0) {
                        chvHealthConditionName = (req.body.chvHealthConditionName as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvHealthConditionName submitted"
                        });
                    }
                    if (req.body.intPersonID && Number.isInteger(+req.body.intPersonID) && +req.body.intPersonID > 0) {
                        intPersonID = +req.body.intPersonID;
                    } else {
                        errorMessages.push({
                            error: "Invalid intPersonID submitted"
                        });
                    }
                    if(errorMessages.length > 0){
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return; 
                    }
                    try {
                        await dbTableOperator.upsertHealthConditions(
                            intHealthConditionID,
                            chvHealthConditionName,
                            intIsActiveID,
                            chlHealthConditionDescription,
                            intPersonID
                        );
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: 'Health Condition operation successful'
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
            case 'tlkpIncidentDamages':
                    if (req.method === 'GET') {
                        try {
                            let result = await dbTableOperator.getIncidentDamages();
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
                        let intIncidentDamageID = 0;
                        let chvIncidentDamage:string;
                        let chvIncidentDamageDescription:string = null;

                        if (req.body.intIncidentDamageID && Number.isInteger(+req.body.intIncidentDamageID)) {
                            intIncidentDamageID = +req.body.intIncidentDamageID;
                        }
                        if (req.body.chvIncidentDamageDescription && (req.body.chvIncidentDamageDescription as string).trim().length > 0) {
                            chvIncidentDamageDescription = (req.body.chvIncidentDamageDescription as string).trim();
                        }
                        if (req.body.chvIncidentDamage && (req.body.chvIncidentDamage as string).trim().length > 0) {
                            chvIncidentDamage = (req.body.chvIncidentDamage as string).trim();
                        } else {
                            errorMessages.push({
                                error: "Invalid chvIncidentDamage submitted"
                            });
                        }
                        if(errorMessages.length > 0) {
                            context.res = {
                                status: 400,
                                body: errorMessages
                            };
                            return;
                        }
                        try {
                            await dbTableOperator.upsertIncidentDamages(intIncidentDamageID, chvIncidentDamage, chvIncidentDamageDescription);
                            await dbTableOperator.closeConnection();
                            context.res = {
                                status: 200,
                                body: "Incident Damages operation successful"
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
            case 'tlkpIncidentDetailTypes':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getIncidentDetailTypes();
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
                    let intIncidentDetailTypeID = 0;
                    let chvIncidentDetailType:string;
                    let chvIncidentDetailTypeDescription:string = null;
                    if (req.body.intIncidentDetailTypeID && Number.isInteger(+req.body.intIncidentDetailTypeID)) {
                        intIncidentDetailTypeID = +req.body.intIncidentDetailTypeID;
                    }
                    if (req.body.chvIncidentDetailTypeDescription && (req.body.chvIncidentDetailTypeDescription as string).trim().length > 0) {
                        chvIncidentDetailTypeDescription = (req.body.chvIncidentDetailTypeDescription as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvIncidentDetailTypeDescription submitted"
                        });
                    }
                    if (req.body.chvIncidentDetailType && (req.body.chvIncidentDetailType as string).trim().length > 0) {
                        chvIncidentDetailType = (req.body.chvIncidentDetailType as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvIncidentDetailType submitted"
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
                        await dbTableOperator.upsertIncidentDetailTypes(intIncidentDetailTypeID,
                            chvIncidentDetailType,
                            chvIncidentDetailTypeDescription
                        );
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: "Incident Detail Type operation successful"
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
            case 'tlkpIncidentEscalationPathways':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getIncidentEscalationPathways();
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
                    let intIncidentEscalationPathwayID = 0;
                    let chvIncidentEscalationPathway:string = null;
                    let chvIncidentEscalationPathwayDescription:string = null;

                    if (req.body.intIncidentEscalationPathwayID && Number.isInteger(+req.body.intIncidentEscalationPathwayID)) {
                        intIncidentEscalationPathwayID = +req.body.intIncidentEscalationPathwayID;
                    }
                    if (req.body.chvIncidentEscalationPathway && (req.body.chvIncidentEscalationPathway as string).trim().length > 0) {
                        chvIncidentEscalationPathway = (req.body.chvIncidentEscalationPathway as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvIncidentEscalationPathway submitted"
                        });
                    }
                    if (req.body.chvIncidentEscalationPathwayDescription && (req.body.chvIncidentEscalationPathwayDescription as string).trim().length > 0) {
                        chvIncidentEscalationPathwayDescription = (req.body.chvIncidentEscalationPathwayDescription as string).trim();
                    }
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return; 
                    }
                    
                    try {
                        await dbTableOperator.upsertIncidentEscalationPathway(
                            intIncidentEscalationPathwayID,
                            chvIncidentEscalationPathway,
                            chvIncidentEscalationPathwayDescription);
                        context.res = {
                            status: 200,
                            body: "Incident Escalation Pathways operation successful"
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
            case 'tlkpIncidentMemberTypes':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getIncidentMemberTypes();
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
                    let intIncidentMemberTypeID = 0;
                    let chvIncidentMemberType:string = null;
                    let chvIncidentMemberTypeDescription:string = null;

                    if (req.body.intIncidentMemberTypeID && Number.isInteger(+req.body.intIncidentMemberTypeID)) {
                        intIncidentMemberTypeID = +req.body.intIncidentMemberTypeID;
                    }
                    if (req.body.chvIncidentMemberType && (req.body.chvIncidentMemberType as string).trim().length > 0) {
                        chvIncidentMemberType = (req.body.chvIncidentMemberType as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvIncidentMemberType submitted"
                        });
                    }
                    if (req.body.chvIncidentMemberTypeDescription && (req.body.chvIncidentMemberTypeDescription as string).trim().length > 0) {
                        chvIncidentMemberTypeDescription = (req.body.chvIncidentMemberTypeDescription as string).trim();
                    }
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return; 
                    }                    
                    try {
                        await dbTableOperator.upsertIncidentMemberTypes(
                            intIncidentMemberTypeID,
                            chvIncidentMemberType,
                            chvIncidentMemberTypeDescription
                        );
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: "Incident Member Types operation successful"
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
            case 'tlkpIncidentOutcomes':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getIncidentOutcomes();
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
                    let intIncidentOutcomeID = 0;
                    let chvIncidentOutcome:string = null;
                    let chvIncidentOutcomeDescription:string = null;
                    
                    if (req.body.intIncidentOutcomeID && Number.isInteger(+req.body.intIncidentOutcomeID)) {
                        intIncidentOutcomeID = +req.body.intIncidentOutcomeID;
                    }
                    if (req.body.chvIncidentOutcome && (req.body.chvIncidentOutcome as string).trim().length > 0) {
                        chvIncidentOutcome = (req.body.chvIncidentOutcome as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvIncidentOutcome submitted"
                        });
                    }
                    if (req.body.chvIncidentOutcomeDescription && (req.body.chvIncidentOutcomeDescription as string).trim().length > 0) {
                        chvIncidentOutcomeDescription = (req.body.chvIncidentOutcomeDescription as string).trim();
                    }
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return; 
                    }
                    
                    try {
                        await dbTableOperator.upsertIncidentOutcome(intIncidentOutcomeID, chvIncidentOutcome, chvIncidentOutcomeDescription);
                        await dbTableOperator.closeConnection();

                        context.res = {
                            status: 200,
                            body: "Incident Outcomes operation successful"
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
            case 'tlkpIncidentRootCauses':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getIncidentRootCauses();
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
                    let intIncidentRootCauseID = 0;
                    let chvIncidentRootCause:string = null;
                    let chvIncidentRootCauseDescription:string = null;

                    
                    if (req.body.intIncidentRootCauseID && Number.isInteger(+req.body.intIncidentRootCauseID)) {
                        intIncidentRootCauseID= +req.body.intIncidentRootCauseID;
                    }
                    if (req.body.chvIncidentRootCause && (req.body.chvIncidentRootCause as string).trim().length > 0) {
                        chvIncidentRootCause = (req.body.chvIncidentRootCause as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvIncidentRootCause submitted"
                        });
                    }
                    if (req.body.chvIncidentRootCauseDescription && (req.body.chvIncidentRootCauseDescription as string).trim().length > 0) {
                        chvIncidentRootCauseDescription = (req.body.chvIncidentRootCauseDescription as string).trim();
                    }
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return; 
                    }
                    
                    try {
                        await dbTableOperator.upsertIncidentRootCause(
                            intIncidentRootCauseID,
                            chvIncidentRootCause,
                            chvIncidentRootCauseDescription
                        );
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: "Incident Root Cause operation successful"
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
            case 'tlkpIncidentStatus':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getIncidentStatus();
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
                    let intIncidentStatusID = 0;
                    let chvIncidentStatus:string = null;                    
                    if (req.body.intIncidentStatusID && Number.isInteger(+req.body.intIncidentStatusID)) {
                        intIncidentStatusID = +req.body.intIncidentStatusID;
                    }
                    if (req.body.chvIncidentStatus && (req.body.chvIncidentStatus as string).trim().length > 0) {
                        chvIncidentStatus = (req.body.chvIncidentStatus as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvIncidentStatus submitted"
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
                        await dbTableOperator.upsertIncidentStatus(
                            intIncidentStatusID,
                            chvIncidentStatus
                        );
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: "Incident Status operation successful"
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
            case 'tlkpIncidentSeverities':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getIncidentSeverities();
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
                    let intIncidentSeverityID = 0;
                    let chvIncidentSeverity:string = null;
                    let chvIncidentSeverityDescription:string = null;
                    
                    if (req.body.intIncidentSeverityID && Number.isInteger(+req.body.intIncidentSeverityID)) {
                       intIncidentSeverityID = +req.body.intIncidentSeverityID;
                    }
                    if (req.body.chvIncidentSeverityDescription && (req.body.chvIncidentSeverityDescription as string).trim().length > 0) {
                        chvIncidentSeverityDescription = (req.body.chvIncidentSeverityDescription as string).trim();
                    }
                    if (req.body.chvIncidentSeverity && (req.body.chvIncidentSeverity as string).trim().length > 0) {
                        chvIncidentSeverity = (req.body.chvIncidentSeverity as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvIncidentSeverity submitted"
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
                        await dbTableOperator.upsertIncidentSeverity(
                            intIncidentSeverityID,
                            chvIncidentSeverity,
                            chvIncidentSeverityDescription
                        );
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: "Incident Severity operation successful"
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
            case 'tlkpIncidentTypes':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getIncidentTypes();
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
                    let intIncidentTypeID = 0;
                    let chvIncidentType:string = null;
                    let chvIncidentTypeDescription:string = null;                    

                    
                    if (req.body.intIncidentTypeID && Number.isInteger(+req.body.intIncidentTypeID)) {
                        intIncidentTypeID = +req.body.intIncidentTypeID;
                    }
                    if (req.body.chvIncidentType && (req.body.chvIncidentType as string).trim().length > 0) {
                        chvIncidentType = (req.body.chvIncidentType as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvIncidentType submitted"
                        });
                    }
                    if (req.body.chvIncidentTypeDescription && (req.body.chvIncidentTypeDescription as string).trim().length > 0) {
                        chvIncidentTypeDescription = (req.body.chvIncidentTypeDescription as string).trim();
                    }
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return; 
                    }
                   
                    try {
                        await dbTableOperator.upsertIncidentTypes(intIncidentTypeID, chvIncidentType, chvIncidentTypeDescription);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: "Incident Types operation successful"
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
            case 'tlkpMeetingAgendas':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getMeetingAgendas();
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
                    let intMeetingAgendaID = 0;
                    let chvMeetingAgenda:string = null;
                    let chvMeetingAgendaDescription:string = null;

                    
                    if (req.body.intMeetingAgendaID && Number.isInteger(+req.body.intMeetingAgendaID)) {
                        intMeetingAgendaID = +req.body.intMeetingAgendaID;
                    }
                    if (req.body.chvMeetingAgenda && (req.body.chvMeetingAgenda as string).trim().length > 0) {
                        chvMeetingAgenda = (req.body.chvMeetingAgenda as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvMeetingAgenda submitted"
                        });
                    }
                    if (req.body.chvMeetingAgendaDescription && (req.body.chvMeetingAgendaDescription as string).trim().length > 0) {
                        chvMeetingAgendaDescription = (req.body.chvMeetingAgendaDescription as string).trim();
                    } 
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return; 
                    }
                    
                    try {
                        await dbTableOperator.upsertMeetingAgendas(intMeetingAgendaID, chvMeetingAgenda, chvMeetingAgendaDescription);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: "Meeting Agendas operation successful"
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
            case 'tblOfficeLocations':
                if (req.method === 'GET') {
                    let tz:number = null;
                    if (req.query.chvRemoteTimeZone && Number.isInteger(+req.query.chvRemoteTimeZone)) {
                        tz = +req.query.chvRemoteTimeZone;
                    }
                    try {
                        let result = await dbTableOperator.getOfficeLocations(tz);
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
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return; 
                    }
                    */
                    try {

                        context.res = {
                            status: 200,
                            body: "operation successful"
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
            case 'tlkpPersonalInterests':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getPersonalInterests();
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
                    let intPersonalInterestID = 0;
                    let chvPersonalInterest:string = null;
                    
                    if (req.body.intPersonalInterestID && Number.isInteger(+req.body.intPersonalInterestID)) {
                        intPersonalInterestID = +req.body.intPersonalInterestID;
                    }
                    if (req.body.chvPersonalInterest && (req.body.chvPersonalInterest as string).trim().length > 0) {
                        chvPersonalInterest = (req.body.chvPersonalInterest as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvPersonalInterest submitted"
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
                        await dbTableOperator.upsertPersonalInterests(intPersonalInterestID, chvPersonalInterest);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: "Personal Interests operation successful"
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
            case 'tlkpPolicyFrameworks':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getPolicyFrameworks();
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
                    let intPolicyFrameworkID = 0;
                    let chvPolicyFrameworkName:string = null;
                    let chvPolicyFrameworkDescription:string = null;

                    
                    if (req.body.intPolicyFrameworkID && Number.isInteger(+req.body.intPolicyFrameworkID)) {
                        intPolicyFrameworkID = +req.body.intPolicyFrameworkID;
                    }
                    if (req.body.chvPolicyFrameworkName && (req.body.chvPolicyFrameworkName as string).trim().length > 0) {
                        chvPolicyFrameworkName = (req.body.chvPolicyFrameworkName as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvPolicyFrameworkName submitted"
                        });
                    }
                    if (req.body.chvPolicyFrameworkDescription && (req.body.chvPolicyFrameworkDescription as string).trim().length > 0) {
                        chvPolicyFrameworkDescription = (req.body.chvPolicyFrameworkDescription as string).trim();
                    }
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return; 
                    }
                    
                    try {
                        await dbTableOperator.upsertPolicyFrameworks(intPolicyFrameworkID, chvPolicyFrameworkName, chvPolicyFrameworkDescription);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: "Policy Framework operation successful"
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

            case 'tlkpPolicySchedules':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getPolicySchedules();
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
                    let intPolicyScheduleID = 0;
                    let chvPolicyScheduleName:string = null;
                    let chvPolicyScheduleDescription:string = null;

                    if (req.body.intPolicyScheduleID && Number.isInteger(+req.body.intPolicyScheduleID)) {
                       intPolicyScheduleID = +req.body.intPolicyScheduleID;
                    }
                    if (req.body.chvPolicyScheduleName && (req.body.chvPolicyScheduleName as string).trim().length > 0) {
                        chvPolicyScheduleName = (req.body.chvPolicyScheduleName as string).trim();
                    } else {
                        errorMessages.push({
                            error: "Invalid chvPolicyScheduleName submitted"
                        });
                    }
                    if (req.body.chvPolicyScheduleDescription && (req.body.chvPolicyScheduleDescription as string).trim().length > 0) {
                        chvPolicyScheduleDescription = (req.body.chvPolicyScheduleDescription as string).trim();
                    }
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return; 
                    }
                    
                    try {
                        await dbTableOperator.upsertPolicySchedules(intPolicyScheduleID, chvPolicyScheduleName, chvPolicyScheduleDescription);
                        await dbTableOperator.closeConnection();
                        context.res = {
                            status: 200,
                            body: "Policy Schedule operation successful"
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
            case 'tlkpProgressNoteChoices':
                if (req.method === 'GET') {
                    try {
                        let result = await dbTableOperator.getProgressNoteChoices();
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
                    let intProgressNoteChoiceID = 0;
                    let chvProgressNoteChoice:string = null;

                    
                    if (req.body.intProgressNoteChoiceID && Number.isInteger(+req.body.intProgressNoteChoiceID)) {
                        intProgressNoteChoiceID = +req.body.intProgressNoteChoiceID;
                    }
                    if (req.body.chvProgressNoteChoice && (req.body.chvProgressNoteChoice as string).trim().length > 0) {
                        chvProgressNoteChoice = (req.body.chvProgressNoteChoice as string).trim();
                    } else {
                        errorMessages.push({
                            error: "chvProgressNoteChoice"
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
                        await dbTableOperator.upsertProgressNoteChoice(intProgressNoteChoiceID, chvProgressNoteChoice);
                        await dbTableOperator
                        context.res = {
                            status: 200,
                            body: "Progress Note Choice operation successful"
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
            case 'tblProgressNoteTemplates':
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
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return; 
                    }
                    */
                    try {

                        context.res = {
                            status: 200,
                            body: "operation successful"
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
            case 'tblPublicHolidaySchedule':
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
                    if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return; 
                    }
                    */
                    try {

                        context.res = {
                            status: 200,
                            body: "operation successful"
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
                   if (errorMessages.length > 0) {
                        context.res = {
                            status: 400,
                            body: errorMessages
                        };
                        return; 
                    }
                   */
                    try {

                        context.res = {
                            status: 200,
                            body: "operation successful"
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