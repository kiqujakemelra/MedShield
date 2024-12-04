import { v4 as uuidv4 } from "uuid";
import { StableBTreeMap } from "azle";
import express from "express";
import { time } from "azle";

/**
 * healthRecordsStorage - Key-value datastructure to store health records.
 * insurancePoliciesStorage - Key-value datastructure to store insurance policies.
 */

/**
 * Class representing a health record.
 */
class HealthRecord {
  id: string;
  patientName: string;
  dateOfBirth: string;
  medicalHistory: string;
  createdAt: Date;
  updatedAt: Date | null;
}

/**
 * Class representing an insurance policy.
 */
class InsurancePolicy {
  id: string;
  policyHolder: string; // Name of the policyholder
  coverageDetails: string; // Details of the insurance coverage
  premiumAmount: number; // Monthly/Yearly premium
  createdAt: Date;
  updatedAt: Date | null;
}

const healthRecordsStorage = StableBTreeMap<string, HealthRecord>(0);
const insurancePoliciesStorage = StableBTreeMap<string, InsurancePolicy>(1);

const app = express();
app.use(express.json());

// Create a new health record
app.post("/health-records", (req, res) => {
  const healthRecord: HealthRecord = {
    id: uuidv4(),
    createdAt: getCurrentDate(),
    updatedAt: null,
    ...req.body,
  };
  healthRecordsStorage.insert(healthRecord.id, healthRecord);
  res.json(healthRecord);
});

// Retrieve all health records
app.get("/health-records", (req, res) => {
  res.json(healthRecordsStorage.values());
});

// Retrieve a specific health record by ID
app.get("/health-records/:id", (req, res) => {
  const recordId = req.params.id;
  const record = healthRecordsStorage.get(recordId);
  if (!record) {
    res.status(404).send(`Health record with id=${recordId} not found`);
  } else {
    res.json(record);
  }
});

// Update a health record
app.put("/health-records/:id", (req, res) => {
  const recordId = req.params.id;
  const record = healthRecordsStorage.get(recordId);
  if (!record) {
    res.status(404).send(`Health record with id=${recordId} not found`);
  } else {
    const updatedRecord = {
      ...record,
      ...req.body,
      updatedAt: getCurrentDate(),
    };
    healthRecordsStorage.insert(record.id, updatedRecord);
    res.json(updatedRecord);
  }
});

// Delete a health record
app.delete("/health-records/:id", (req, res) => {
  const recordId = req.params.id;
  const deletedRecord = healthRecordsStorage.remove(recordId);
  if (!deletedRecord) {
    res.status(404).send(`Health record with id=${recordId} not found`);
  } else {
    res.json(deletedRecord);
  }
});

// Create a new insurance policy
app.post("/insurance-policies", (req, res) => {
  const policy: InsurancePolicy = {
    id: uuidv4(),
    createdAt: getCurrentDate(),
    updatedAt: null,
    ...req.body,
  };
  insurancePoliciesStorage.insert(policy.id, policy);
  res.json(policy);
});

// Retrieve all insurance policies
app.get("/insurance-policies", (req, res) => {
  res.json(insurancePoliciesStorage.values());
});

// Retrieve a specific insurance policy by ID
app.get("/insurance-policies/:id", (req, res) => {
  const policyId = req.params.id;
  const policy = insurancePoliciesStorage.get(policyId);
  if (!policy) {
    res.status(404).send(`Insurance policy with id=${policyId} not found`);
  } else {
    res.json(policy);
  }
});

// Get the current date
function getCurrentDate() {
  const timestamp = new Number(time());
  return new Date(timestamp.valueOf() / 1000_000);
}

app.listen();
