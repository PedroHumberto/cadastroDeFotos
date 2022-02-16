

export default {
    /*Gancho para a diretiva, usado quando é associada ao elemento do DOM*/
    bind(el, binding, vnode){
        let current = 0;

        el.addEventListener('dblclick', function(){

            let increment = binding.value || 90;
            let effect;


            /* vnode:
                Este parâmetro é uma referência para o Virtual DOM utilizado pelo Vue. 
                Ele permite acessar propriedades do Componente no qual ela foi associada.
                No entanto, essa dependência pode acabar com o reuso da diretiva, por isso deve ser usado com parcimônia. 
                Além disso, não é comum querermos interagir com esse parâmetro.*/
            console.log(vnode.context.fotos[0]);

            /*pode ser feito mais de um modificador como colocar um reverse fiacando: v-meu-transform.animate.reverse="15"*/ 
            if (!binding.arg || binding.arg == 'rotate'){
                if(binding.modifiers.reverse){
                    current -= increment;
                }else{
                    current=+ increment;
                }
                effect = `rotate(${current}deg)`;

            } else if (binding.arg == "scale"){
                effect = `scale(${increment})`    
            }
            
            current += increment;
            el.style.transform = effect;
            
            if(binding.modifiers.animate) 
                el.style.transition = 'transform 0.5s'
        });
    }
}