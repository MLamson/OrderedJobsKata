export class OrderedJobs {
    static putInOrder(jobList: string): string {
        let splitJobs: string[] = jobList.split("\n");
        let jobsWithDependencies: string[] = [];
        let finalJobsList: string = "";
        let jobAdded: boolean = true;

        if (this.jobListEmpty(jobList)) {
            return "";
        }

        for (let job of splitJobs) {
            this.breakdownSplitJobs(job, jobsWithDependencies, finalJobsList);
        }
        while (jobAdded) {
            let currentJobListLength: number = finalJobsList.length;
            for (let i: number = 0; i < jobsWithDependencies.length; i++) {
                if (this.jobDependencyMet(finalJobsList, jobsWithDependencies, i)) {
                    finalJobsList += jobsWithDependencies[i][0];
                    jobsWithDependencies.splice(i, 1);
                }
            }
            if (this.jobNotAdded(currentJobListLength, finalJobsList)) {
                jobAdded = false;
            }
        }
        if (this.dependentJobsNotAdded(jobsWithDependencies)) {
            return "error: circular dependency";
        }
        return finalJobsList;
    }

    private static breakdownSplitJobs(job, jobsWithDependencies: string[], finalJobsList: string) {
        if (this.jobDependentOnSelf(job)) {
            this.jobSelfDependentMessage();
        }
        if (this.jobHasDependency(job)) {
            jobsWithDependencies.push(job);
        }
        else {
            finalJobsList += job[0];
        }
        return finalJobsList;
    }

    private static jobSelfDependentMessage() {
        return "error: job self dependent";
    }

    private static dependentJobsNotAdded(jobsWithDependencies: string[]) {
        return jobsWithDependencies.length > 0;
    }

    private static jobNotAdded(currentJobListLength: number, finalJobsList: string) {
        return currentJobListLength === finalJobsList.length;
    }

    private static jobDependencyMet(finalJobsList: string, jobsWithDependencies: string[], i: number) {
        return finalJobsList.indexOf(jobsWithDependencies[i][5]) !== -1;
    }

    private static jobHasDependency(job) {
        return job[5] !== " ";
    }

    private static jobDependentOnSelf(job) {
        return job[0] === job[5];
    }

    private static jobListEmpty(jobList: string) {
        return jobList === "";
    }

}