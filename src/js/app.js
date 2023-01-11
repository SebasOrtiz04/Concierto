document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    crearGaleria();
    scrolNav();
    navegacionFija();
    mostrarMenuMovil();
}

function mostrarMenuMovil(){
    const btn = document.querySelector('.menu-celular');
    const nav = document.querySelector('.navegacion-principal');
    const body = document.querySelector('body');
    const cerrar = document.createElement('P');
    cerrar.onclick = function(){
        cerrarMenuMovil(cerrar);
    }
    cerrar.textContent = 'X';
    cerrar.classList.add('btn-cerrar');

    btn.addEventListener('click', function(){
        body.classList.add('fijar-body');
        nav.appendChild(cerrar);
        nav.classList.add('movil');
    })
}

function cerrarMenuMovil(cerrar=false){
    const nav = document.querySelector('.navegacion-principal');
    const body = document.querySelector('body');

    if(cerrar){
        cerrar.remove();
    }

    nav.classList.remove('movil');
    body.classList.remove('fijar-body');
}

function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){

        if(sobreFestival.getBoundingClientRect().bottom < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo'); 
            body.classList.remove('body-scroll');
        }
    })
}

function scrolNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace=>{
        enlace.addEventListener('click',function(e){

            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            cerrarMenuMovil();
            setTimeout(()=>{
                seccion.scrollIntoView({        
                    behavior: "smooth" 
                 });
            },200);
 
        })
    });
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i=1;i<=12;i++){
        const imagen = document.createElement('PICTURE');
        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img width="200" loading="lazy" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;

        imagen.onclick = function(){
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id){

    const body = document.querySelector('body');

    const imagen = document.createElement('PICTURE');
    imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img width="200" loading="lazy" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
    `;

    //Crea un overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.onclick = function(){
        overlay.remove();
        body.classList.remove('fijar-body');
    }
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    //Botón para cerrar el modal

    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function(){
        overlay.remove();
        body.classList.remove('fijar-body')
    }
    overlay.appendChild(cerrarModal);

    //Añade la imagen al body
    
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}