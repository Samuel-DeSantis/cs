import mongoose from 'mongoose'

import app from './app.js'
import logger from './utils/logger.js'

const PORT = process.env.PORT || 8080;
const options = {}

mongoose.connect(process.env.MONGO_URI, options)
	.then(() => {	app.listen(PORT, logger.info(`MongoDB Connected - http://localhost:8080/`))	})
	.catch((err) => console.error('MongoDB connection error:', err))

	// const user = await User.create({
	// 	name: 'Alice Engineer',
	// 	username: 'aliceeng',
	// 	email: 'alice@example.com',
	// 	password_hash: await Auth.hashPassword('securepassword'),
	// 	organization: 'EnergyCo',
	// 	role: 'engineer',
	// 	phone: '555-1234',
	// 	location: 'San Diego, CA'
	// });
	
	// const circuits = await Circuit.insertMany([
	// 	{
	// 		circuit_number: 'C-101',
	// 		designator: 'D1',
	// 		equipment: 'Transformer A',
	// 		tag: 'T-A',
	// 		circuit_id: 'CIR101',
	// 		drawing: 'DWG001',
	// 		length: 120,
	// 		conductors: '3C',
	// 		size: '4 AWG',
	// 		type: 'THWN',
	// 		sys_volts: '480V',
	// 		insulation: 'PVC',
	// 		from: 'Panel A',
	// 		to: 'Motor B',
	// 		via: 'Junction 1',
	// 		comments: 'Primary feed',
	// 		rev: 'A'
	// 	},
	// 	{
	// 		circuit_number: 'C-102',
	// 		designator: 'D2',
	// 		equipment: 'Panel B',
	// 		tag: 'P-B',
	// 		circuit_id: 'CIR102',
	// 		drawing: 'DWG002',
	// 		length: 80,
	// 		conductors: '2C',
	// 		size: '6 AWG',
	// 		type: 'XHHW',
	// 		sys_volts: '208V',
	// 		insulation: 'XLPE',
	// 		from: 'Panel A',
	// 		to: 'Panel B',
	// 		via: '',
	// 		comments: 'Feeder to Panel B',
	// 		rev: 'B'
	// 	}
	// ]);
	
	// const project = await Project.create({
	// 	name: 'Solar Retrofit Project',
	// 	description: 'Upgrade facility with solar and backup circuits',
	// 	client: 'Acme Corp',
	// 	location: 'Phoenix, AZ',
	// 	status: 'in-progress',
	// 	startDate: new Date(),
	// 	endDate: null,
	// 	circuits: circuits.map(c => c._id),
	// 	users: [user._id]
	// });
	
	// user.projects.push(project._id);
	// await user.save();
	// await project.save();

	// const fullUser = await User.findById(user._id)
  // .populate({
  //   path: 'projects',
  //   populate: { path: 'circuits' }
  // });

	// console.log(JSON.stringify(fullUser, null, 2));

	// const projects = await Project.find()
	// 	.populate('users')
	// 	.populate('circuits');
	// console.log('Projects:', JSON.stringify(projects, null, 2));