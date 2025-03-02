import { ProjectInterface } from '../models/ProjectInterface';
import sampleCow from '../../public/smapleCow.jpg';
import sampleCow2 from '../../public/sampleCow2.jpg';


const dummyProjects: ProjectInterface[] = [
  {
    project: "cow10",
    location: "Bogura",
    value: 10000,
    currency: "BDT",
    period: "6 Month",
    return: "2%-6%",
    total_return: "$10,375 - $10,425",
    cover: "../../public/smapleCow.jpg"
  },
  {
    project: "cow11",
    location: "Dhaka",
    value: 12000,
    currency: "BDT",
    period: "8 Month",
    return: "3%-7%",
    total_return: "$12,500 - $12,600",
    cover: "../../public/sample2.jpg"
  },
  {
    project: "cow12",
    location: "Chittagong",
    value: 15000,
    currency: "BDT",
    period: "10 Month",
    return: "4%-8%",
    total_return: "$15,800 - $16,000",
 cover: "../../public/smapleCow.jpg"
  },
  {
    project: "cow13",
    location: "Sylhet",
    value: 9000,
    currency: "BDT",
    period: "5 Month",
    return: "2.5%-5.5%",
    total_return: "$9,200 - $9,300",
       cover: "../../public/sample2.jpg"
  },
  {
    project: "cow14",
    location: "Rajshahi",
    value: 11000,
    currency: "BDT",
    period: "7 Month",
    return: "3.5%-6.5%",
    total_return: "$11,400 - $11,500",
     cover: "../../public/smapleCow.jpg"
  },
  {
    project: "cow15",
    location: "Khulna",
    value: 13000,
    currency: "BDT",
    period: "9 Month",
    return: "4.5%-7.5%",
    total_return: "$13,700 - $13,800",
       cover: "../../public/sample2.jpg"
  }
];

export default dummyProjects;
