'use client';

import ProtectedRoute from '../components/ProtectedRoute';
import DashboardLayout from '../components/DashboardLayout';
import EnergyDisplay from '../components/EnergyDisplay';
import ContactTeamButton from '../components/ContactTeamButton';
import AppCard from './components/AppCard';
import { Search } from 'lucide-react';

// Apps that Augment Flow can connect to and use
const apps: Array<{
  id: string;
  name: string;
  description: string;
  image: string;
  badge: string;
  type: 'core' | 'integration';
}> = [
  // Core Apps (Working)
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Connect your Gmail to send emails, create drafts, and summarize your inbox.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg',
    badge: 'Available',
    type: 'core'
  },
  {
    id: 'sheets',
    name: 'Google Sheets',
    description: 'Connect Google Sheets to add rows, update cells, and manage spreadsheets.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg',
    badge: 'Coming Soon',
    type: 'core'
  },
  // Third-party integrations
  {
    id: 'agentql',
    name: 'AgentQL',
    description: 'Web scraping and automation using natural language queries.',
    image: 'https://agents-storage.nyc3.digitaloceanspaces.com/agents/agentql.png',
    badge: 'Variables',
    type: 'integration'
  },
  {
    id: 'apollo',
    name: 'Apollo',
    description: 'A comprehensive data enrichment and search tool that integrates with Apollo.io\'s API to find and enrich professional profiles and company information. It provides single and bulk enrichment capabilities for people and organizations, along with powerful search functionality and job posting insights to identify growth opportunities.',
    image: 'https://agents-storage.nyc3.digitaloceanspaces.com/agents/apollo.png',
    badge: 'Variables',
    type: 'integration'
  },
  {
    id: 'aws-apigateway',
    name: 'AWS API Gateway',
    description: 'Amazon API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale.',
    image: 'https://agents-storage.nyc3.digitaloceanspaces.com/agents/aws-apigateway.png',
    badge: 'Variables',
    type: 'integration'
  },
  {
    id: 'aws-cloudwatch',
    name: 'AWS Cloudwatch',
    description: 'AWS CloudWatch - Monitoring and observability service that collects metrics, logs, and alarms to track application performance and infrastructure health.',
    image: 'https://agents-storage.nyc3.digitaloceanspaces.com/agents/aws-cloudwatch.png',
    badge: 'Variables',
    type: 'integration'
  },
  {
    id: 'aws-cost-management',
    name: 'AWS Cost Management',
    description: 'AWS Billing and Cost Management agent provides a suite of features to help you set up your billing, retrieve and pay invoices, and analyze, organize, plan, and optimize your costs',
    image: 'https://agents-storage.nyc3.digitaloceanspaces.com/agents/aws-cost-management.png',
    badge: 'Variables',
    type: 'integration'
  },
  {
    id: 'aws-dynamodb',
    name: 'AWS DynamoDB',
    description: 'AWS DynamoDB - Fully managed NoSQL database service that provides fast, predictable performance for applications requiring single-digit millisecond latency at any scale.',
    image: 'https://agents-storage.nyc3.digitaloceanspaces.com/agents/aws-dynamodb.png',
    badge: 'Variables',
    type: 'integration'
  },
  {
    id: 'aws-ec2',
    name: 'AWS EC2',
    description: 'Amazon Elastic Compute Cloud (Amazon EC2) provides on-demand, scalable computing capacity in the AWS Cloud.',
    image: 'https://agents-storage.nyc3.digitaloceanspaces.com/agents/aws-ec2.png',
    badge: 'Variables',
    type: 'integration'
  },
  {
    id: 'aws-iam',
    name: 'AWS IAM',
    description: 'AWS Identity and Access Management (IAM) is a web service that helps you securely control access to AWS resources',
    image: 'https://agents-storage.nyc3.digitaloceanspaces.com/agents/aws-iam.png',
    badge: 'Variables',
    type: 'integration'
  },
  {
    id: 'aws-lambda',
    name: 'AWS Lambda',
    description: 'AWS Lambda - Serverless compute service that runs code in response to events without managing servers.',
    image: 'https://agents-storage.nyc3.digitaloceanspaces.com/agents/aws-lambda.png',
    badge: 'Variables',
    type: 'integration'
  },
  {
    id: 'aws-route53',
    name: 'AWS Route 53',
    description: 'Amazon Route 53 is a highly available and scalable cloud domain name system (DNS) service. Enables to customize DNS routing policies to reduce latency.',
    image: 'https://agents-storage.nyc3.digitaloceanspaces.com/agents/aws-route53.png',
    badge: 'Variables',
    type: 'integration'
  },
  {
    id: 'aws-s3',
    name: 'AWS S3',
    description: 'AWS S3 Object storage service agent for storing and retrieving files',
    image: 'https://agents-storage.nyc3.digitaloceanspaces.com/agents/aws-s3.png',
    badge: 'Variables',
    type: 'integration'
  },
  {
    id: 'aws-sns',
    name: 'AWS SNS',
    description: 'AWS SNS - Push notification service that sends messages to multiple subscribers through various channels including email, SMS, mobile push, and HTTP endpoints.',
    image: 'https://agents-storage.nyc3.digitaloceanspaces.com/agents/aws-sns.png',
    badge: 'Variables',
    type: 'integration'
  },
  {
    id: 'aws-sqs',
    name: 'AWS SQS',
    description: 'Amazon Simple Queue Service (Amazon SQS) is a fully managed message queuing service.',
    image: 'https://agents-storage.nyc3.digitaloceanspaces.com/agents/aws-sqs.png',
    badge: 'Variables',
    type: 'integration'
  }
];

export default function AppsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <EnergyDisplay />
        
        <main className="flex-1 bg-background sidebar-scrollable-content overflow-y-auto">
          <div className="flex flex-col h-[calc(100dvh-64px)] lg:h-[100dvh] bg-background w-full">
            <div className="w-full h-full overflow-y-auto">
              <div className="w-full px-4 md:px-10 py-10 lg:px-32 lg:py-16">
                {/* Header */}
                <div className="w-full flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground">
                    Connected Apps
                  </h1>
                  <div className="flex gap-2 items-center">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search apps..."
                        className="file:text-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-10 w-full min-w-0 border px-3 shadow-xs outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive pl-10 pr-4 max-w-100 flex-grow py-3 text-xs text-foreground placeholder:text-muted-foreground bg-muted border-border rounded-xl focus:ring-primary/20 transition-all duration-200 truncate"
                      />
                    </div>
                  </div>
                </div>

                {/* Apps Grid */}
                <div className="w-full">
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
                    {apps.map((app) => (
                      <AppCard key={app.id} app={app} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <ContactTeamButton />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
