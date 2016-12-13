import {OrderedJobs} from "../src/OrderedJobs";

describe('Ordered Jobs', () => {
    it('empty joblist should return empty string', () => {
        expect(OrderedJobs.putInOrder("")).toEqual("");
    });
    it('joblist with single job should return job', () => {
        expect(OrderedJobs.putInOrder("a =>  ")).toEqual("a");
    });
    it('joblist with multiple jobs should return jobs in order', () => {
        expect(OrderedJobs.putInOrder("a =>  \nb =>  \nc =>  ")).toEqual("abc");
    });
    it('joblist with multiple jobs and one dependency should return jobs in order', () => {
        expect(OrderedJobs.putInOrder("a =>  \nb => c\nc =>  ")).toEqual("acb");
    });
    it('joblist with multiple jobs and multiple dependency should return jobs in order', () => {
        expect(OrderedJobs.putInOrder("a =>  \nb => c\nc => d\nd =>  ")).toEqual("adcb");
    });
    it('joblist dependent on self should return error', () => {
        expect(OrderedJobs.putInOrder("a =>  \nb => c\nc => c\nd =>  ")).toEqual("error: job self dependent");
    });
    it('joblist with circular dependency should return error', () => {
        expect(OrderedJobs.putInOrder("a =>  \nb => c\nc => d\nd => b")).toEqual("error: circular dependency");
    });
    it('Empty job list should return empty string', () => {
        expect(OrderedJobs.putInOrder("")).toEqual("");
    });
    it('one job no dependency should return job', () => {
        expect(OrderedJobs.putInOrder("a =>  ")).toEqual("a");
    });
    it('multiple jobs no dependency should return jobs in order', () => {
        expect(OrderedJobs.putInOrder("a =>  \nb =>  \nc =>  ")).toEqual("abc");
    });
    it('multiple jobs one dependency should return jobs in order', () => {
        expect(OrderedJobs.putInOrder("a =>  \nb => c\nc =>  ")).toEqual("acb");
    });
    it('multiple jobs multiple dependencies should return jobs in order', () => {
        expect(OrderedJobs.putInOrder("a =>  \nb => c\nc => d\nd =>  ")).toEqual("adcb");
    });
    it('empty job list should return empty string', () => {
        expect(OrderedJobs.putInOrder("")).toEqual("");
    });
    it('single job in job list should return job', () => {
        expect(OrderedJobs.putInOrder("a =>  ")).toEqual("a");
    });
    it('multiple jobs in job list with no dependencies should return jobs in order', () => {
        expect(OrderedJobs.putInOrder("a =>  \nb =>  \nc =>  ")).toEqual("abc");
    });
    it('multiple jobs in job list with one dependencies should return jobs in order', () => {
        expect(OrderedJobs.putInOrder("a =>  \nb => c\nc =>  ")).toEqual("acb");
    });
    it('multiple jobs in job list with multiple dependencies should return jobs in order', () => {
        expect(OrderedJobs.putInOrder("a =>  \nb => c\nc => a")).toEqual("acb");
    });
    it('multiple jobs in job list with multiple dependencies that have circular dependency should return error message', () => {
        expect(OrderedJobs.putInOrder("a =>  \nb => c\nc => d\nd => b")).toEqual("error: circular dependency");
    });
    it('should return error if job has circular dependency', () => {
        expect(OrderedJobs.putInOrder("a =>  \nb => c\nc =>  f\nd => a\ne => \nf => b")).toEqual("error: circular dependency");
    });
    it('should return error if job has circular dependency', () => {
        expect(OrderedJobs.putInOrder("a => b\nb => c\nc => a")).toEqual("error: circular dependency");
    });
    it('Jobs dependent on self should throw error', () => {
        expect(OrderedJobs.putInOrder("a =>  \nb => c\nc => c")).toEqual("error: job self dependent");
    });
    it('should return job list in order for multiple jobs multiple depencencies', () => {
        expect(OrderedJobs.putInOrder("a =>  \nb => c\nc => f\nd => a\ne => b\nf =>  ")).toEqual("afcbed"); //"afcbde"
    });
    it('should return multiple jobs in order from jobs list input and multiple dependecies', () => {
        expect(OrderedJobs.putInOrder("a => d\nb => c\nc => a\nd =>  ")).toEqual("dacb");
    });
});