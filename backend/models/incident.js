'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Incident extends Model {}

  Incident.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    service: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    severity: {
      type: DataTypes.ENUM('SEV1', 'SEV2', 'SEV3', 'SEV4'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('OPEN', 'MITIGATED', 'RESOLVED'),
      defaultValue: 'OPEN'
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: true
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Incident',
  });
  return Incident;
};