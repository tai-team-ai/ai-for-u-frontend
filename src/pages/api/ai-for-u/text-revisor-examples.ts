import { NextApiRequest, NextApiResponse } from "next";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({
      "exampleNames": [
        "string"
      ],
      "examples": [
        {
          "freeformCommand": "",
          "textToRevise": "string",
          "numberOfRevisions": 1,
          "revisionTypes": [
            "spelling",
            "grammar",
            "sentence structure",
            "word choice",
            "consistency",
            "punctuation"
          ],
          "tone": "friendly",
          "creativity": 50
        }
      ]
    })
}

// /ai-for-u/text-revisor