/*
 * Copyright (c) 2023 DevRev, Inc. All rights reserved.
 */


import function_to_Complete_issue from './functions/function_to_Complete_issue/index';

export const functionFactory = {

  function_to_Complete_issue,
  
} as const;

export type FunctionFactoryType = keyof typeof functionFactory;
