const inactiveColour = "#C49211";
const activeColour = "#543b22";

function find(element)
{
    return document.querySelector(element);
}

window.onload = () => {
    fade(".loader");
    var scrollPrev = 0;
    const navElements = [find(".fa-user"),find(".fa-music"),find(".fa-file-alt")];
    find(".main").addEventListener('scroll', ()=>{
        var scroll = Math.round(find(".main").scrollTop/window.innerHeight) + Math.round(find(".main").scrollLeft/window.innerWidth);
        if(scrollPrev != scroll)
        {
            navElements[0].style.color = inactiveColour;
            navElements[1].style.color = inactiveColour;
            navElements[2].style.color = inactiveColour;
            if(scroll > 0)
            {
                navElements[scroll-1].style.color = activeColour;
            }
            scrollPrev = scroll;
        }
    });
}

var opacity = 1;
function fade(element){
    setTimeout(() => {
        opacity -= 0.04;
        find(element).style.opacity = opacity;
        if(opacity > 0.0001)
        {
            fade(element);
        }
        else
        {
            dissapear()
        }
    }, 30);
}

function dissapear() {
    find(".loader").style.display = "none";
}