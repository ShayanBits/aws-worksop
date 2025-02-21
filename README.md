# 🚀 AWS CloudFormation Playground

Welcome to my **AWS CloudFormation Playground**! This repository is where I experiment with **AWS CloudFormation templates**, test out different configurations, and play around with **EC2, S3, and more AWS resources**.

This isn't just for others who might take a look—**the comments in the templates are also reminders for my future self**, so I can quickly recall what each section does without having to figure it all out again.

---

## 📌 **What’s in This Repository?**
This repository contains:
- **CloudFormation templates** for launching AWS resources like:
  - EC2 instances
  - S3 buckets
  - Custom IAM roles (if needed in the future)
- **AWS CLI commands** that I use to create, update, and delete stacks.
- Useful **notes** on troubleshooting common AWS deployment issues.

---

## 🛠 **How to Use These Templates**
If you want to test these templates on your own AWS account, follow these steps:

### **1️⃣ Prerequisites**
- 🏗 **An AWS account**
- 💻 **AWS CLI installed & configured** (`aws configure`)
- 📝 **CloudFormation permissions** (if using IAM roles)

### **2️⃣ Deploy a CloudFormation Stack**
To create a CloudFormation stack using one of the YAML templates, run:

```sh
aws cloudformation create-stack \
    --stack-name my-aws-test-stack \
    --template-body file://ec2-stack.yaml \
    --parameters ParameterKey=SubnetId,ParameterValue=subnet-12345678 \
                 ParameterKey=LaunchTemplateName,ParameterValue=my-test-launch-template \