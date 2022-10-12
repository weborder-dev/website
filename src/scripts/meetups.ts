import dayjs from 'dayjs'
import 'dayjs/locale/es-mx'

var customParseFormat = require('dayjs/plugin/customParseFormat')
var localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(customParseFormat)
dayjs.extend(localizedFormat);
dayjs.locale('es-mx')

interface MeetupInterface {
    date: string;
    log: string;
    author: string;
    url: string;
    body: string;
    isVirtual: boolean;
    image: string;
}

type MeetupKey = keyof MeetupInterface;


class Meetups {
    isMeetupsPage: boolean;
 
    constructor() {
        this.isMeetupsPage = this.isPageMeetupsPage();

        window.addEventListener('load', () => {
            this.onPageLoad();
          });
    }

    onPageLoad() {
        
        if(this.isMeetupsPage) {
            fetch('../assets/data/meetups.json')
            .then((response) => response.json())
            .then((meetups:MeetupInterface[]) => {
                let sortedMeetups: MeetupInterface[] = [...meetups];
                sortedMeetups.reverse();
                
                sortedMeetups.forEach((mt: MeetupInterface) => {
                    var str = "<pre><code>{</br>";
                    Object.keys(mt).forEach((key) => {
                    if(key) {
                        
                        const isDateKey = key === "date";
                        const isImageKey = key === "image";
                        const isVirtualKey = key === "isVirtual";
                        const isUrlKey = key === "url";
                        const currentKeyValue= mt[key as MeetupKey] as typeof key;
                        const isUrlEmpty = currentKeyValue === "";
        
                        if(!(isImageKey || isVirtualKey || isUrlKey || isDateKey)) {
                            str += '<span>' + key + ':</span> ' + currentKeyValue + '</br>';
                        }
        
                        if(isUrlKey && !isUrlEmpty) {
                            str += `<span>${key}:</span> <a target="_blank" href="${currentKeyValue}">${currentKeyValue}</a></br>`;
                        }

                        if(isDateKey) {
                            console.log("currentKeyValue", currentKeyValue);
                            
                            const dateFormat = dayjs(currentKeyValue, "DD-MM-YYYY").format('LL').toString()
                            str += '<span>' + key + ':</span> ' + dateFormat + '</br>';
                        }
                    }
                    });
                    str += "}</code></pre>";
                    document.getElementById('list')?.insertAdjacentHTML('beforeend', str);
                });
                

                this.loadNextMeetup(sortedMeetups[0]);
            });
        }
    }

    loadNextMeetup(meetup: any) {
        const nextMeetupTitle = document.getElementById("next-meetup-body");
        const nextMeetupAuthor = document.getElementById("next-meetup-author");

        if(nextMeetupTitle) {
            nextMeetupTitle.innerText = meetup.log;
        }

        if(nextMeetupAuthor) {
            nextMeetupAuthor.innerText = meetup.author;
        }   
    }
 
    isPageMeetupsPage(): boolean {
       const currentURL = window.location.pathname;
       return Boolean(currentURL.includes('meetups'));
     }
 }
 
 new Meetups();
 