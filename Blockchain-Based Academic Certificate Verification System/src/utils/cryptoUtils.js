export async function calculateSHA256(dataString) {
  const encoder = new TextEncoder();
  const data = encoder.encode(dataString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export function generateRandomHex(length = 32) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export function createCertificatePayload(data) {
  return JSON.stringify({
    studentId: data.studentId.trim().toUpperCase(),
    studentName: data.studentName.trim(),
    course: data.course.trim(),
    department: data.department.trim(),
    institution: data.institution.trim(),
    issueDate: data.issueDate,
    passingYear: data.passingYear,
    cgpa: data.cgpa.trim(),
    certificateType: data.certificateType,
    signatoryAuthority: data.signatoryAuthority.trim()
  });
}

export async function generateBlockchainRecord(certificateData, previousBlockHash = "0000000000000000000a3b89ef12c45d6789abcd0123456789abcdef01234567") {
  const canonicalPayload = createCertificatePayload(certificateData);
  const certificateHash = await calculateSHA256(canonicalPayload);
  
  const timestamp = new Date().toISOString();
  const nonce = Math.floor(Math.random() * 900000 + 100000);
  
  const blockDataString = `${previousBlockHash}:${certificateHash}:${timestamp}:${nonce}`;
  const blockHash = await calculateSHA256(blockDataString);
  
  const digitalSignature = '0x' + generateRandomHex(64);
  const transactionHash = '0x' + generateRandomHex(32);
  const contractAddress = '0xPCS261407e3FaB91aC441097e88241F83cC87A14';

  return {
    certificateHash: '0x' + certificateHash,
    canonicalPayload,
    blockHash: '0x' + blockHash,
    previousBlockHash: previousBlockHash.startsWith('0x') ? previousBlockHash : '0x' + previousBlockHash,
    digitalSignature,
    transactionHash,
    contractAddress,
    nonce,
    timestamp,
    gasUsed: Math.floor(Math.random() * 15000 + 45000) + ' Gwei'
  };
}

export async function verifyCertificateIntegrity(cert) {
  try {
    const canonical = createCertificatePayload(cert);
    const recomputedHash = '0x' + (await calculateSHA256(canonical));
    const isAuthentic = recomputedHash.toLowerCase() === cert.certificateHash.toLowerCase();
    return {
      isValid: isAuthentic,
      storedHash: cert.certificateHash,
      calculatedHash: recomputedHash,
      blockHash: cert.blockHash,
      transactionHash: cert.transactionHash,
      timestamp: cert.timestamp
    };
  } catch (error) {
    return {
      isValid: false,
      error: error.message
    };
  }
}
