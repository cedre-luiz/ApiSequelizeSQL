module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Niveis', [
			{
				descr_niveis: 'básico',
				createdAt: new Date(),
				updatedAt: new Date()			
			},
			{
				descr_niveis: 'intermediário',
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				descr_niveis: 'avançado',
				createdAt: new Date(),
				updatedAt: new Date()
			} 
	], {})
  },

  down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('Niveis', null, {})
  }
}
