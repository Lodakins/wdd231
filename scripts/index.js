const toggleBtn = document.querySelector("#toggle-btn");
const iconimg = document.querySelector("#icon");
const menu = document.querySelector("nav.menus");

const body = document.querySelector(".main-body");
const spaceImg = document.querySelector('.space-image');

body.addEventListener("click", e => {

  const tabname = document.querySelectorAll(".tab-name");
  const tabs = document.querySelectorAll(".tab-1");

  if (e.target.classList.contains("tab-name")) {
      tabname.forEach(el => {
        el.classList.remove("active");
      });

      e.target.classList.add("active");
      const dataAttr = e.target.getAttribute("data-attr");
      const imgAttr = e.target.getAttribute("data-img");
      spaceImg.src = `/images/destination/${imgAttr}`;

      tabs.forEach(el => {
        el.classList.remove("active");
        if (el.classList.contains(dataAttr)) {
          el.classList.add("active");
        }
      });
  }
});

const mainnav = document.querySelector('.navigation')
const hambutton = document.querySelector('#menu');

hambutton.addEventListener('click', () => {
	mainnav.classList.toggle('show');
	hambutton.classList.toggle('show');
});


const courses = [
  {
      subject: 'CSE',
      number: 110,
      title: 'Introduction to Programming',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
      technology: [
          'Python'
      ],
      completed: false
  },
  {
      subject: 'WDD',
      number: 130,
      title: 'Web Fundamentals',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
      technology: [
          'HTML',
          'CSS'
      ],
      completed: true
  },
  {
      subject: 'CSE',
      number: 111,
      title: 'Programming with Functions',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
      technology: [
          'Python'
      ],
      completed: true
  },
  {
      subject: 'CSE',
      number: 210,
      title: 'Programming with Classes',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
      technology: [
          'C#'
      ],
      completed: true
  },
  {
      subject: 'WDD',
      number: 131,
      title: 'Dynamic Web Fundamentals',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
      technology: [
          'HTML',
          'CSS',
          'JavaScript'
      ],
      completed: true
  },
  {
      subject: 'WDD',
      number: 231,
      title: 'Frontend Web Development I',
      credits: 2,
      certificate: 'Web and Computer Programming',
      description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
      technology: [
          'HTML',
          'CSS',
          'JavaScript'
      ],
      completed: false
  }
]



let courseDetailContainer = document.querySelector('.course-details-cont');
let creditContainer = document.querySelector('#credit');

let totalCredit = 0;
let courseHTML="";

function loadAllCourse(){

  totalCredit = courses.reduce((ac,cr)=>{
    return ac + cr.credits
  },0);
  courses.forEach(function(elx){
    courseHTML+=`<div class="course-detail  ${elx.completed ? "active" : ""}">
              ${elx.subject} ${elx.number}
            </div>`;
  });

  courseDetailContainer.innerHTML=courseHTML;
  creditContainer.innerHTML= totalCredit;


}




document.querySelectorAll('.course-card').forEach(function(el,idx){
        el.addEventListener('click',function(ele){

          totalCredit = 0;
          courseHTML="";
          
          let button  = ele.target;
          let attr = button.getAttribute('data-attr');

          if(attr == "ALL"){
            loadAllCourse();
          }else{

            totalCredit = courses.filter((el)=> el.subject == attr).reduce((ac,cr)=>{
              return ac + cr.credits
            },0);
            courses.filter((el)=> el.subject == attr).forEach(function(elx){
              courseHTML+=`<div class="course-detail  ${elx.completed ? "active" : ""}">
                        ${elx.subject} ${elx.number}
                      </div>`;
          });
          }
         

          courseDetailContainer.innerHTML=courseHTML;
          creditContainer.innerHTML= totalCredit;

      });

});

loadAllCourse();

