import { belongsTo, Factory, hasMany, Model, Server } from 'miragejs'


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
            })
        },
        seeds:(server) =>{
            server.create('user');
        },
        routes() {
            this.urlPrefix= "https://diaries.com"
            
        }   

    })
}