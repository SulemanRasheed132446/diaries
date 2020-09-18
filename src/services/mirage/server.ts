import { belongsTo, Factory, hasMany, Model, Server } from 'miragejs'
import user from  './routes/user'
import diary from './routes/diary'
import entry from './routes/entry'
export const setUpServer  = (env? :any) => {
    new Server({
        environment: env ?? 'development',
        models :{
            user: Model.extend({
               diary: hasMany(),
            }),
            diary: Model.extend({
               user: belongsTo(),
               entry: hasMany(),
            }),
            entry: Model.extend({
               diary: hasMany()
            })
        },
        factories: {
            user: Factory.extend({
                username:"test",
                password: "password",
                email:"test@email.com",
                diaryIds:[]
            }),
            

        },
        seeds:(server) =>{
            server.create('user');
        },
        routes() {
            this.urlPrefix= "https://diaries.com";
            this.post('/auth/login', user.login);
            this.post('/auth/signUp',user.signUp );
            this.post('diaries/:id', diary.createDiary);
            this.put('/diaries/:id', diary.updateDiary);
            this.get('/diaries/:id', diary.getDiaries);
            this.get('diaries/:id/entry', entry.getEntries);
            this.put('/diaries/entry/:id', entry.updateEntry);
            this.post('/diaries/entry', entry.createEntry);
        }   

    })
}