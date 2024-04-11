/*
 * Copyright (c) 2023 DevRev, Inc. All rights reserved.
 */

import { client ,publicSDK} from "@devrev/typescript-sdk";

type IssueDetails = {
  displayName : string | undefined;
  previousStatus:string | undefined;
  NewStatus:string | undefined;
};


const update_issue= async(workId: string, devrevSDK: publicSDK.Api<any>) => {
 
  try{
    // Accessing of the Issue Id which has to updated to Completed Stage
    const OldIssueResp = await devrevSDK.worksGet({
      id: workId,
    });

    // Stage of Issue is updated from current stage to Completed Stage
    const UpdateIssueResp = await devrevSDK.worksUpdate({
      type:publicSDK.WorkType.Issue,
      id:workId,
      stage:{
        name:"completed"
      }

    });

    const oldIssue = OldIssueResp.data.work;
    const UpdatedIssue = UpdateIssueResp.data.work;

    //Populating the display id of Issue and Previous and New Stage data 
    const issueDetails: IssueDetails = {
      displayName : oldIssue.display_id,
      previousStatus:oldIssue.stage?.name,
      NewStatus:UpdatedIssue.stage?.name
    };

    return issueDetails;

   } catch(error) {
      console.error(error);
      throw new Error('Failed to update issue details');
   }
};

async function handleEvent(
    event: any,
  ) {
    const devrevPAT = event.context.secrets.service_account_token;
    const API_BASE = event.execution_metadata.devrev_endpoint;
    const devrevSDK = client.setup({
      endpoint: API_BASE,
      token: devrevPAT,
    })
  
    const workId = event.payload.source_id;
    
    const UpdateDetails = await update_issue(workId,devrevSDK);
    
    let bodyComment = 'Issue '+ UpdateDetails.displayName+' updated from '+ UpdateDetails.previousStatus + ' to '+ UpdateDetails.NewStatus;

    const body = {
      object: workId,
      type: 'timeline_comment', 
      body:  bodyComment,
    }

    const response = await devrevSDK.timelineEntriesCreate(body as any);
    return response;

}

export const run = async (events: any[]) => {
  console.info('events', JSON.stringify(events), '\n\n\n');
  for (let event of events) {
    const resp = await handleEvent(event);
    console.log(JSON.stringify(resp.data));
  }
};

export default run;
