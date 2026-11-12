export const INITIAL_ADMINS = [
  {
    id: "admin-1",
    name: "Prof. (Dr.) Haris M. Khan",
    email: "admin@integral.edu.in",
    password: "admin123",
    role: "Registrar & Primary Node Validator",
    institution: "Integral University, Lucknow",
    nodeId: "NODE-IU-LKO-01-PRIMARY",
    publicKey: "0x4F8a1B92348C3d71EfB24888C90a1E7b420fAA21",
    logo: "./integral_university_logo.jpg"
  },
  {
    id: "admin-2",
    name: "Dr. Syed Aqeel Ahmad",
    email: "registrar@integral.edu.in",
    password: "admin123",
    role: "Dean of Academic Affairs & Node Signer",
    institution: "Integral University, Lucknow",
    nodeId: "NODE-IU-LKO-02-PEER",
    publicKey: "0x89C71eF38B2189a0B29E30A124976cB4612809f1",
    logo: "./integral_university_logo.jpg"
  }
];

export const SAMPLE_PGDIT_CERTIFICATE = {
  id: "PGDIT12345",
  studentName: "Kyle Henderson",
  studentId: "PGDIT12345",
  course: "Post Graduate Diploma in Information Technology",
  department: "Institute of Information Technology",
  institution: "Jahangirnagar University",
  issueDate: "2026-04-15",
  passingYear: "2026",
  cgpa: "3.95 / 4.0",
  certificateType: "Post Graduate Diploma Certificate",
  signatoryAuthority: "Prof. Dr. Kyle H., Director & Registrar",
  signatureName: "Kyle H.",
  certificateHash: "0xe343b47bb3aa76f617d07cac44549d6bf58278e3f936f7bb15855926f84ee64d",
  blockHash: "0x0000a98f123456789abcdef0123456789abcdef0123456789abcdef012345678",
  previousBlockHash: "0x0000abc1923847fedbca02938475610293847561029384756102938475610293",
  digitalSignature: "0x789bce91a2837461524387591823746192837461524387591823746192837461",
  transactionHash: "0x3918273645019283746591827364501928374659182736450192837465918273",
  contractAddress: "0xPCS261407e3FaB91aC441097e88241F83cC87A14",
  blockHeight: 148200,
  status: "VERIFIED",
  verifiedAt: "2026-04-15T10:00:00Z",
  signatoryNode: "NODE-JU-IIT-01"
};

export const INITIAL_VERIFIED_CERTIFICATES = [
  SAMPLE_PGDIT_CERTIFICATE,
  {
    id: "CERT-PCS26140-2026-1001",
    studentName: "Mohd. Zaid Khan",
    studentId: "IU-2022-BCS-8901",
    course: "Bachelor of Technology",
    department: "Computer Science & Engineering",
    institution: "Integral University, Lucknow",
    issueDate: "2026-05-20",
    passingYear: "2026",
    cgpa: "9.45 / 10.0",
    certificateType: "Degree Certificate (Honors)",
    signatoryAuthority: "Prof. (Dr.) Haris M. Khan, Registrar",
    certificateHash: "0xa38f7c9e01b4528d99c43ef102879482756182cba04918e9a4f2105e49b8120c",
    blockHash: "0x0000abc1923847fedbca02938475610293847561029384756102938475610293",
    previousBlockHash: "0x0000000000000000000a3b89ef12c45d6789abcd0123456789abcdef01234567",
    digitalSignature: "0x51c4a91f893e430b192837465918237461928374619283746192837461928374",
    transactionHash: "0x789bce91a2837461524387591823746192837461524387591823746192837461",
    contractAddress: "0xPCS261407e3FaB91aC441097e88241F83cC87A14",
    blockHeight: 148201,
    status: "VERIFIED",
    verifiedAt: "2026-05-20T10:15:00Z",
    signatoryNode: "NODE-IU-LKO-01-PRIMARY"
  },
  {
    id: "CERT-PCS26140-2026-1002",
    studentName: "Ayesha Siddiqui",
    studentId: "IU-2022-MCA-4412",
    course: "Master of Computer Applications",
    department: "Computer Application & Cloud Computing",
    institution: "Integral University, Lucknow",
    issueDate: "2026-06-14",
    passingYear: "2026",
    cgpa: "9.80 / 10.0",
    certificateType: "Master's Degree (Summa Cum Laude)",
    signatoryAuthority: "Prof. (Dr.) Haris M. Khan, Registrar",
    certificateHash: "0xb71e98234c019283746591827364501928374659182736450192837465918273",
    blockHash: "0x0000def829103847561029384756102938475610293847561029384756102938",
    previousBlockHash: "0x0000abc1923847fedbca02938475610293847561029384756102938475610293",
    digitalSignature: "0x42f8901b23847561029384756102938475610293847561029384756102938475",
    transactionHash: "0x9182736450192837465918273645019283746591827364501928374659182736",
    contractAddress: "0xPCS261407e3FaB91aC441097e88241F83cC87A14",
    blockHeight: 148202,
    status: "VERIFIED",
    verifiedAt: "2026-06-14T14:40:22Z",
    signatoryNode: "NODE-IU-LKO-01-PRIMARY"
  },
  {
    id: "CERT-PCS26140-2026-1003",
    studentName: "Farhan Alam",
    studentId: "IU-2021-BEE-3290",
    course: "Bachelor of Technology",
    department: "Electronics & Communication Engineering",
    institution: "Integral University, Lucknow",
    issueDate: "2026-07-02",
    passingYear: "2026",
    cgpa: "8.92 / 10.0",
    certificateType: "Degree Certificate",
    signatoryAuthority: "Prof. (Dr.) Haris M. Khan, Registrar",
    certificateHash: "0xc849182736450192837465918273645019283746591827364501928374659182",
    blockHash: "0x0000456102938475610293847561029384756102938475610293847561029384",
    previousBlockHash: "0x0000def829103847561029384756102938475610293847561029384756102938",
    digitalSignature: "0x6391827364501928374659182736450192837465918273645019283746591827",
    transactionHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    contractAddress: "0xPCS261407e3FaB91aC441097e88241F83cC87A14",
    blockHeight: 148203,
    status: "VERIFIED",
    verifiedAt: "2026-07-02T09:12:45Z",
    signatoryNode: "NODE-IU-LKO-01-PRIMARY"
  }
];

export const INITIAL_PENDING_CERTIFICATES = [
  {
    id: "CERT-PCS26140-2026-2001",
    studentName: "Alina Fatima",
    studentId: "IU-2023-CS-7719",
    course: "Bachelor of Technology",
    department: "Artificial Intelligence & Machine Learning",
    institution: "Integral University, Lucknow",
    issueDate: "2026-10-10",
    passingYear: "2026",
    cgpa: "9.60 / 10.0",
    certificateType: "Degree Certificate (Honors)",
    signatoryAuthority: "Prof. (Dr.) Haris M. Khan, Registrar",
    certificateHash: "0x9ef01a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
    digitalSignature: "0x7890abcdef1234567890abcdef1234567890abcdef1234567890abcdef123456",
    status: "PENDING",
    submittedAt: "2026-10-11T16:20:00Z",
    submittedBy: "Prof. (Dr.) Haris M. Khan (admin@integral.edu.in)"
  },
  {
    id: "CERT-PCS26140-2026-2002",
    studentName: "Rehan Warsi",
    studentId: "IU-2022-DS-5108",
    course: "Master of Science",
    department: "Data Science & Analytics",
    institution: "Integral University, Lucknow",
    issueDate: "2026-10-12",
    passingYear: "2026",
    cgpa: "9.15 / 10.0",
    certificateType: "Master's Degree",
    signatoryAuthority: "Prof. (Dr.) Haris M. Khan, Registrar",
    certificateHash: "0x3456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef012",
    digitalSignature: "0xabcd1234ef567890abcd1234ef567890abcd1234ef567890abcd1234ef567890",
    status: "PENDING",
    submittedAt: "2026-10-12T08:45:00Z",
    submittedBy: "Prof. (Dr.) Haris M. Khan (admin@integral.edu.in)"
  }
];

export function loadStoredData(key, fallback) {
  try {
    const item = localStorage.getItem(`pcs26140_ju_v1_${key}`);
    if (item) {
      const parsed = JSON.parse(item);
      if (key === 'verified_certs' && Array.isArray(parsed)) {
        if (!parsed.some(c => c.id === 'PGDIT12345' || c.studentId === 'PGDIT12345')) {
          return [SAMPLE_PGDIT_CERTIFICATE, ...parsed];
        }
      }
      return parsed;
    }
    return fallback;
  } catch {
    return fallback;
  }
}

export function saveStoredData(key, data) {
  try {
    localStorage.setItem(`pcs26140_ju_v1_${key}`, JSON.stringify(data));
  } catch {
  }
}
