'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up (queryInterface, Sequelize) {
    const incidents = [];
    const services = ['Payment Gateway', 'Auth Service', 'Search API', 'Notification Service', 'Data Pipeline'];
    const severities = ['SEV1', 'SEV2', 'SEV3', 'SEV4'];
    const statuses = ['OPEN', 'MITIGATED', 'RESOLVED'];
    
    const descriptions = [
        "Database connection timeout occurred during peak load.",
        "Memory leak detected in the main processing node.",
        "API latency increased by 500ms for all users.",
        "Third-party payment provider returned 503 errors.",
        "User authentication tokens are expiring prematurely.",
        "Frontend assets failed to load from CDN.",
        "Scheduled cron job failed to execute at midnight.",
        "Cache invalidation logic caused stale data display."
    ];

    for (let i = 0; i < 200; i++) {
      const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
      
      incidents.push({
        id: uuidv4(),
        title: `Incident ${i + 1}: ${randomDesc.split(' ').slice(0, 4).join(' ')}...`, // Realistic titles
        service: services[Math.floor(Math.random() * services.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        owner: `Engineer ${Math.floor(Math.random() * 10)}`,
        summary: randomDesc, 
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return queryInterface.bulkInsert('Incidents', incidents, {});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Incidents', null, {});
  }
};