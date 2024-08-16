/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:Kj1DH4wdavQi@ep-flat-hat-a50kzhym.us-east-2.aws.neon.tech/prepMateDB?sslmode=require',
    }
  };