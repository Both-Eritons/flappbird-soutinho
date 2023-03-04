const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const planoDeDundo = {
	sX: 390,
	sY: 0,
	largura: 275,
	altura: 204,
	x: 0,
	y: canvas.height - 204,
	desenha() {
		ctx.fillStyle = '#70c5ce'
		ctx.fillRect(0,0, canvas.width, canvas.height);
		ctx.drawImage(
			sprites,
			planoDeDundo.sX, planoDeDundo.sY,//sprite X, sprite Y
			planoDeDundo.largura, planoDeDundo.altura,//tamanho do recorte da imagem
			planoDeDundo.x, planoDeDundo.y,//onde vai ser desenhado
			planoDeDundo.largura, planoDeDundo.altura//o tamanho do desenho
		);
		ctx.drawImage(
			sprites,
			planoDeDundo.sX, planoDeDundo.sY,//sprite X, sprite Y
			planoDeDundo.largura, planoDeDundo.altura,//tamanho do recorte da imagem
			(planoDeDundo.x + planoDeDundo.largura), planoDeDundo.y,//onde vai ser desenhado
			planoDeDundo.largura, planoDeDundo.altura//o tamanho do desenho
		);
	}
}
const chao = {
	sX: 0,
	sY: 610,
	largura: 224,
	altura: 112,
	x: 0,
	y: canvas.height - 112,
	desenha() {
		ctx.drawImage(
			sprites,
			chao.sX, chao.sY,//sprite X, sprite Y
			chao.largura, chao.altura,//tamanho do recorte da imagem
			chao.x, chao.y,//onde vai ser desenhado
			chao.largura, chao.altura//o tamanho do desenho
		);
		ctx.drawImage(
			sprites,
			chao.sX, chao.sY,//sprite X, sprite Y
			chao.largura, chao.altura,//tamanho do recorte da imagem
			(chao.x + chao.largura), chao.y,//onde vai ser desenhado
			chao.largura, chao.altura//o tamanho do desenho
		);
	}
}

const flappyBird = {
	sX: 0,
	sY: 0,
	largura: 34,
	altura: 24,
	x: 10,
	y: 50,
	gravidade: 0.25,
	velocidade: 0,
	atualiza() {
		flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
		flappyBird.y = flappyBird.y + flappyBird.velocidade
	},
	desenha() {
		ctx.drawImage(
			sprites,
			flappyBird.sX, flappyBird.sY,//sprite X, sprite Y
			flappyBird.largura, flappyBird.altura,//tamanho do recorte da imagem
			flappyBird.x, flappyBird.y,//onde vai ser desenhado
			flappyBird.largura, flappyBird.altura//o tamanho do desenho
		);
	}
}

const getReady = {
	sX: 134,
	sY: 0,
	w: 174,
	h: 152,
	x: (canvas.width / 2) - 174 / 2,
	y: 50,
	desenha() {
		ctx.drawImage(
			sprites,
			getReady.sX, getReady.sY,//sprite X, sprite Y
			getReady.w, getReady.h,//tamanho do recorte da imagem
			getReady.x, getReady.y,//onde vai ser desenhado
			getReady.w, getReady.h//o tamanho do desenho
		);
	}
}

//
// telas
//
let telaAtiva = {};
function mudaTela(novaTela) {
	telaAtiva = novaTela;
}
const Telas = {
	INICIO: {
		desenha() {
			planoDeDundo.desenha();
			flappyBird.desenha();
			chao.desenha();
			getReady.desenha();
		},
		click(){
			 mudaTela(Telas.JOGOS)
		},
		atualiza() {

		}
	}
}
Telas.JOGOS = {
	desenha() {
		planoDeDundo.desenha();
		flappyBird.desenha();
		chao.desenha();
	},
	click() {
		flappyBird.pula();
	},
	atualiza() {
		flappyBird.atualiza();
	}
}
function loop() {
	telaAtiva.desenha();
	telaAtiva.atualiza();
	requestAnimationFrame(loop);
}

window.addEventListener("click", () => {
	if(telaAtiva.click) {
		 telaAtiva.click();
	}
})

mudaTela(Telas.INICIO);
loop();