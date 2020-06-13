import generateImage from './imageGenerator.mjs';
import sendMessageWpp from './sendMessage.mjs';

(async function (){
  
	const image = await generateImage();

	sendMessageWpp(image);
	
})();
