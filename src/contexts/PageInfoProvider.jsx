import { useQuery } from "@tanstack/react-query";
import React, { createContext, useState } from "react";
import { getRepo } from "../api/Login.api";
export const PageInfoContext = createContext();

export default function PageInfoProvider(props) {
  const [pageTitle, setPageTitle] = useState("");
  const [breadCrumbList, setBreadCrumbList] = useState([]);
  const [transactionName, setTransactionName] = useState("");
  const [transactionLink, setTransactionLink] = useState("");
  const [branch, setBranch] = useState("");
  const [userName, setUserName] = useState("");
  const [reponame, setrepoName] = useState("");
  const [orgName, setOrgName] = useState("");
  const {
    data: userRepo,
    isFetching: isRepoFetching,
    refetch: RepoRefetch,
  } = useQuery(["orgsRepo", orgName], () => getRepo(orgName), {
    enabled: false,
    retry: false,
    onError: (RepoRefetch) => {
      RepoRefetch();
    },
  });
  return (
    <PageInfoContext.Provider
      value={{
        pageTitle,
        breadCrumbList,
        transactionLink,
        transactionName,
        setPageTitle,
        setBreadCrumbList,
        setTransactionLink,
        setTransactionName,
        branch,
        setBranch,
        reponame,
        setrepoName,
        userName,
        setUserName,
        orgName,
        setOrgName,
        userRepo,
        RepoRefetch,
        isRepoFetching,
      }}
    >
      {props.children}
    </PageInfoContext.Provider>
  );
}
