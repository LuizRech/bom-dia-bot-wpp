import jimp from 'jimp';
import path from 'path';
import moment from 'moment';

moment.locale('pt-br');

function searchImageUrl(){
    return `https://picsum.photos/400/400?random=${Math.random()}`;
};

async function getImageDimension(image){
	const width = await image.getWidth();
	const height = await image.getHeight();

	return {width, height};
};

async function getTextDimension({font, text}){
	const width = await jimp.measureText(font, text);
	const height = await jimp.measureTextHeight(font, text, width);

	return {width, height};
};

function getDimensionCentralPosition({imgDimension, txtDimension}){
	return imgDimension / 2 - txtDimension / 2;
};

async function getExactlyDay(){
	const numberDay = await moment().format("d");
	var weekDay;
	
	if(numberDay == 6 || numberDay == 0){
		const day = await moment().format("dddd");
		weekDay = `um ótimo ${day}`;
	}else{
		const day = await moment().format("dddd");
		weekDay = `uma ótima ${day}`;
	}

	return weekDay;
};

const generateImage = async () => {
	const link = searchImageUrl();
	const image = await jimp.read(link);

	const font78 = await jimp.loadFont(path.resolve('src', 'fonts', 'font78.fnt'));
	const font28 = await jimp.loadFont(path.resolve('src', 'fonts', 'font28.fnt'));
	
	// Pegar dimensão da imagem para realizar o cálculo
	// e poder posicionar os textos
	const imageDimension = await getImageDimension(image);
	
	// Pegar dimensão da fonte para realizar o cálculo
	// e posicionar o texto em determinado x y na imagem
	// com base na const imageDimension
	const font78Dimension = await getTextDimension({font: font78, text: 'Bom dia!'});
	const font28Dimension = await getTextDimension({font: font28, text: 'Um ótimo sábado!'});
	

	let imageWithText = await image.print(
		font78, 
		getDimensionCentralPosition({
			imgDimension: imageDimension.width, 
			txtDimension: font78Dimension.width
		}), 
		0, 
		'Bom dia!'
	);
	
	imageWithText = await image.print(
		font28, 
		getDimensionCentralPosition({
			imgDimension: imageDimension.width, 
			txtDimension: font78Dimension.width
		}), 
		330, 
		'Que você tenha'
	);

	imageWithText = await image.print(
		font28, 
		getDimensionCentralPosition({
			imgDimension: imageDimension.width, 
			txtDimension: font78Dimension.width
		}), 
		360, 
		await getExactlyDay()
	);

	const imageBase64 = await imageWithText.getBase64Async(jimp.MIME_JPEG);
	return imageBase64;
};

export default generateImage;
