const CLOUD_URI = "136.114.185.5";

class genAI{
    static getGenerativeModel(schema = {
        model:"gemini-flash-latest"
    }){
        return new Model(schema);
    }
}

class Model{
    constructor(schema){
        this.model = schema.model;
        this.generationConfig = schema.generationConfig;
    }
    async generateContent(contentArray = []){
        let options = {
            method:"GET",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                content:structuredClone(contentArray),
                generationConfig:structuredClone(this.generationConfig),
                model:structuredClone(this.model)
            })
        };
        let response = await fetch(CLOUD_URI, options);

        if (!response.ok) {
            throw new Error("Network error");
        }

        console.log(response);
        return response;
    }

    async generateContentStream(contentArray = []) {
        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: structuredClone(contentArray),
                generationConfig: structuredClone(this.generationConfig),
                model: structuredClone(this.model)
            })
        };
        const response = await fetch(CLOUD_URI, options);

        if (!response.ok) {
            throw new Error("Network error");
        }

        // return an async generator that streams text chunks
        return {
            stream:this.streamResponseHandler(response)
        };
    }

    async *streamResponseHandler(response) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { value, done } = await reader.read();
            if (done){
                return;
            }
            yield decoder.decode(value, {
                stream: true
            });
        }
    }
}