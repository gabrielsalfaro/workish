'use strict';

const { JobListing } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await JobListing.bulkCreate([
      {
        employerId: 1,
        companyId: 1,
        city: 'New York',
        state: 'NY',
        title: 'Frontend Developer',
        description: `
          <p>We're looking for a talented <strong>React.js developer</strong> to join our team.</p>
          <ul>
            <li>Experience with Redux and Hooks</li>
            <li>Knowledge of RESTful APIs</li>
            <li>Understanding of responsive design</li>
          </ul>
          <p><em>This is a hybrid role with 2-3 days onsite per week.</em></p>
        `,
      },
      {
        employerId: 2,
        companyId: 2,
        city: 'San Francisco',
        state: 'CA',
        title: 'Backend Developer',
        description: `
          <p>Join our backend engineering team working with <strong>Node.js</strong> and <strong>PostgreSQL</strong>.</p>
          <p>Responsibilities include:</p>
          <ol>
            <li>Designing and maintaining APIs</li>
            <li>Managing database performance and schema</li>
            <li>Implementing authentication systems</li>
          </ol>
          <p>Experience with GraphQL is a plus!</p>
        `,
      },
      {
        employerId: 1,
        companyId: 3,
        city: 'Chicago',
        state: 'IL',
        title: 'Data Analyst',
        description: `
          <p>We're seeking an entry-level data analyst proficient in <strong>Excel</strong> and <strong>SQL</strong>.</p>
          <ul>
            <li>Clean and transform data sets</li>
            <li>Create dashboards using Power BI or Tableau</li>
            <li>Write reports and insights for stakeholders</li>
          </ul>
        `,
      },
      {
        employerId: 2,
        companyId: 4,
        city: 'Austin',
        state: 'TX',
        title: 'DevOps Engineer',
        description: `
          <p>Join our platform team to scale infrastructure using:</p>
          <ul>
            <li>AWS (EC2, S3, RDS)</li>
            <li>Docker & Kubernetes</li>
            <li>CI/CD pipelines (GitHub Actions, Jenkins)</li>
          </ul>
          <p>Certification in AWS is a big plus!</p>
        `,
      },
      {
        employerId: 1,
        companyId: 5,
        city: 'Remote',
        state: 'CA',
        title: 'Product Manager',
        description: `
          <p><strong>Own the product roadmap</strong> from discovery to delivery:</p>
          <ul>
            <li>Lead agile ceremonies</li>
            <li>Write detailed user stories</li>
            <li>Collaborate with design and engineering</li>
          </ul>
          <p>Experience with Jira, Figma, and user research is preferred.</p>
        `,
      },
      {
        employerId: 2,
        companyId: 6,
        city: 'Seattle',
        state: 'WA',
        title: 'UI/UX Designer',
        description: `
          <p>We’re hiring a <strong>UI/UX Designer</strong> to build modern web and mobile interfaces.</p>
          <ul>
            <li>Strong Figma skills</li>
            <li>Ability to create and maintain design systems</li>
            <li>Portfolio demonstrating pixel-perfect designs</li>
          </ul>
          <p>HTML/CSS knowledge is a bonus!</p>
        `,
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'JobListings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      title: { [Op.in]: [
        'Frontend Developer', 
        'Backend Developer',
        'Data Analyst',
        'DevOps Engineer',
        'Product Manager',
        'UI/UX Designer'
      ] }
    }, {});
  }
};
