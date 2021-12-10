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
            case 'tlkpContactSupplierFors':
                if (req.method === 'GET') {
                    let result = await dbTableOperator.getContactSupplierFors();
                    await dbTableOperator.closeConnection();
                    context.res = {
                        status: 200,
                        body: result
                    };
                } else if (req.method === 'POST') {
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
            case '':
                if (req.method === 'GET') {

                } else if (req.method === 'POST') {
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
            case '':
                if (req.method === 'GET') {

                } else if (req.method === 'POST') {
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

                } else if (req.method === 'POST') {
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