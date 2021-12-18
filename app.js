//variables
const numbers= document.querySelectorAll('#number');
const screenLg=document.querySelector('.largescreen');
const screenSm=document.querySelector('.small__screen');
const operation=document.querySelectorAll('#operation');
const acBtn= document.querySelector('#allclear');
const equalsBtn=document.querySelector('#equal');
const deleteBtn=document.querySelector('#delete');
const off=document.querySelector('#off');


// es5 constructor

function Calculator(screenLg,screenSm){
	  this.screenlg=screenLg;
	  this.screensm=screenSm;
	  this.clear();
	
}

Calculator.prototype.clear=function(){
	this.screenTextSM='';
	this.screenTextLG='';
	this.opr=undefined;
}

Calculator.prototype.display=function(number){
	if(this.screenTextLG.length>10)return; // prevent entering characters more than 11

	if(this.opr==='√' || this.opr=='²' || this.opr==='³'|| this.opr==='%'|| this.opr==='∛') return; // to prevent entering while using the squre power 

	if(number==='.' && this.screenTextLG.includes('.'))return;// prevent from entering
	this.screenTextLG=this.screenTextLG.toString() + number.toString();


	
	
}


Calculator.prototype.getCommas=function(number){

	const stringNumber = number.toString();
	const intDigits= parseFloat(stringNumber.split('.')[0]);
	const decimalDigits=(stringNumber.split('.')[1])

	let integerDisplay;

	// like if we select an operation nothing would happen
	if(isNaN(intDigits)){
		integerDisplay=''
	}

	//get the commas
	else{
		integerDisplay=intDigits.toLocaleString('en',{maximumFractionDigits:0});
	}
    
	//the digts with the commas
	if(decimalDigits!=null){
		return `${integerDisplay}.${decimalDigits}`;
	}
	else{
		return integerDisplay;
	}
}

Calculator.prototype.displayOpr=function(opr){

	if(this.screenTextLG==='')return; // if there is no number we wont execute
    

	if(this.screenTextLG!==''){
		this.mathOpr(); // its gonna compute fron the previous operation
	}
	
	//here we are adding the large screen numbers to the small screen after we select the operation
	this.opr=opr;
	this.screenTextSM=this.screenTextLG;
	this.screenTextLG='';
}


Calculator.prototype.update=function(){

	this.screenlg.innerText=this.getCommas(this.screenTextLG);
	

	if(this.opr==='√' || this.opr==='∛'){ // we are moving the sing before the numbers to make it understand
		this.screensm.innerText=`${this.opr} ${this.screenTextSM} `;
		return;
		
	}

	if(this.opr!=null){
		this.screensm.innerText=`${this.getCommas(this.screenTextSM)} ${this.opr}`;
	}
	
	else{
		this.screensm.innerText='';
	}

}

Calculator.prototype.delete=function(){

	//staring from the first index and removing the last digit
	this.screenTextLG=this.screenTextLG.toString().slice(0,-1);
}


Calculator.prototype.getAns=function(answer){
	
	this.opr=undefined;
	this.screenTextSM='';
	this.screenTextLG=answer;
	
	
}

Calculator.prototype.mathOpr=function(){
	
	let answer;
	const firstNumber=parseFloat(this.screenTextSM);
	console.log(firstNumber);
	const lastNumber=parseFloat(this.screenTextLG);

	//at frist time there is no first number in the top so we check this , also if we press plus 2 times also that would happen

	switch(this.opr){
		case'√':
		answer=Math.sqrt(firstNumber)/1;
		break;

		case '∛':
		answer=Math.pow(firstNumber, 1/3);	
		break;	

		case '²':
		answer=Math.pow(firstNumber,2);
		break;

		case'³':
		answer=Math.pow(firstNumber,3);
		break;

		case '%':
		answer=firstNumber/100;
		break;		

	}


	if(this.opr==='√' || this.opr=='²' || this.opr==='³'|| this.opr==='%' || this.opr==='∛'){		
		this.getAns(answer);
	}
		

    if(isNaN(firstNumber) || isNaN(lastNumber))return;

	
	switch(this.opr){
		case '+':
		answer=firstNumber + lastNumber;
		break;	

		case '-':
		answer=firstNumber - lastNumber;
		break;	


		case '*':
		answer=firstNumber * lastNumber;
		break;	

		case '÷':
		answer=firstNumber / lastNumber;
		break;
		
		default:
        return;

	}
	this.getAns(answer);
	
}








const Cal = new Calculator(screenLg,screenSm);


numbers.forEach(num=>{
	num.addEventListener('click',()=>{
		Cal.display(num.innerText);
		console.log(num.innerText);
		Cal.update();
		
	})
  })

operation.forEach((opr)=>{
	opr.addEventListener('click',()=>{
		
		
		operation[1].innerText='²';
		operation[2].innerText='³';
		Cal.displayOpr(opr.innerText);
		Cal.update();
		operation[1].innerText='x²';
		operation[2].innerText='x³';
		
	})
})  



equalsBtn.addEventListener('click',()=>{
	Cal.mathOpr();
	Cal.update();
})



acBtn.addEventListener('click',()=>{
	Cal.clear();
	Cal.update();
})



deleteBtn.addEventListener('click',()=>{
	Cal.delete();
	Cal.update();
})




off.addEventListener('click',()=>{
	const button =document.querySelectorAll('button');
	if(off.innerText==='On'){
		
		off.innerText='Off';
		button.forEach(btn=>{
			screenLg.innerText='Welcome';
			setTimeout(()=>{
				screenLg.innerText='';
			   
				
			 },1000)
			if(btn.id!=='off'){
				btn.disabled=false;
				console.log('Disable');
			
				let i=0;
				
				
			}
		})
		
	}
	else {
		off.innerText='On';
		button.forEach(btn=>{
			if(btn.id!=='off'){
				btn.disabled=true;
				console.log(btn.id);
				Cal.clear();
				Cal.update();
				screenLg.innerHTML='Good Bye';
				screenLg.style.textAlign='left';
				// let id=null;
				
				let i=0;
				setTimeout(()=>{
                   screenLg.innerText='';
				  
				   
				},1000)
			}
		})
	}
})

