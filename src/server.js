import { createServer } from "miragejs"

export function makeServer() {
    let server = createServer({

        seeds(server) {
            server.db.loadData({
                profile: {
                    "name": "Cindy Hall",
                    "bio": "I have over 20 years of experience running People/HR teams and creating company cultures. I believe that great cultures drive great businesses. I love to help companies leverage their values to create and maintain great cultures to drive their business.",
                    "picture": "https://ti.bolster.com/a/5ffe2989cbf0a1006f2593de/1611263724",
                    "experience": [
                        {
                            "company": "Bolster",
                            "title": "Co-founder",
                            "description": "New startup to connect on-demand executives with startups and scaleups.",
                            "dates": "2020|"
                        },
                        {
                            "company": "Acme Widgets",
                            "title": "Chief People Officer",
                            "description": "Fractional and advisory Chief People Officer ",
                            "dates": "2019|2020"
                        },
                        {
                            "company": "Sonantic, Inc.",
                            "title": "Chief People Officer",
                            "description": "Led HR for Sonantic's global business organization across 35 Countries in Europe, Middle East, and Africa. Directly supported Sonantic's President of EMEA, setting and delivering a People strategy for the region.",
                            "dates": "2008|2019"
                        }
                    ]
                }
            })
        },

        routes() {
            this.namespace = "api"

            this.get('/profile', (schema) => {
                return schema.db.profile
            })
            this.post('/profile', (schema, request) => {
                schema.db.profile.remove()
                return schema.db.profile.insert(JSON.parse(request.requestBody))
            })
        },
    })

    return server
}