var Airtable = require('airtable');

module.exports = (atapikey, atbaseid, attablename, atviewname) => {
	const atservice = {};
	atservice.getRecords = () => {
		return new Promise((resolve, reject) => {
			var base = new Airtable({apiKey: atapikey}).base(atbaseid);
			var totalrecords = [];
			base(attablename).select({
				view: atviewname
			}).eachPage(function page(records, fetchNextPage) {
				// This function (`page`) will get called for each page of records.
				records.forEach(function(record) {
					totalrecords.push(record.fields);
				});
				
				fetchNextPage();

			}, function done(err) {
				if (err) { reject(err); return; }
				resolve(totalrecords);
			});
		});    
	};
	return atservice;
};
