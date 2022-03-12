/*
  Here you can *execute* your first task code
  Print the output of your logic implementation into the console

  Once you complete your first task, remove this file
* */
import {transformCandidatesData} from "./helper"

import {fetchCandidates} from "./API";

const runPlayground = async () => {

  console.log("Playground Area\n***************\n");

  // Add your logic here

  const candidates = await fetchCandidates();
  console.log(transformCandidatesData(candidates));

}

// We call this function in App.jsx file, on every page refresh it will run the function again
export const Playground = {
  runPlayground
};
