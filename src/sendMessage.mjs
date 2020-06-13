import wa from '@open-wa/wa-automate';

const sendMessageWpp = async(image) => {
	const imageBase64 = image;
	const client = await wa.create();
	const groups = await client.getAllGroups();
	const filteredGroups = await groups.filter(group => group.formattedTitle == "Teste");

  await client.sendFile(filteredGroups[0].id, imageBase64, 'bomdia.jpg', "");
}

export default sendMessageWpp;