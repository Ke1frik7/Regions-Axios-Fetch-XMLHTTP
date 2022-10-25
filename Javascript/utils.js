function renderElement(element) {
    return document.querySelector(element)
}
function createTag(tag){
    return document.createElement(tag)
}
function texNode(text){
    return document.createTextNode(text)
}
function elementId(id){
    return document.getElementById(id)
}
function $(element){
    return document.querySelector(element)
}
function renderElementALL(element){
    return document.querySelectorAll(element)
}