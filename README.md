# activ5-app
Simple data streaming app for the Activ5 force transducer. It runs as an Angular web app hosted on a laptop through the browser. Data is collected into a CSV file. Data is timestamped by the computer when it is received, but should be approximately 10 Hz.
Please note there is a known bug with the Activ5 device and API. If you stop and re-start streaming of data n times then re-start, you get n duplicate samples at every time point. So you must disconnect and re-pair the device. I contacted their technical support about this but never got a reply. Hope it works well for you!

This software was used in the following publication:
> Merry, K., Napier, C., Chung, V., Hannigan, B. C., Macpherson, M., Menon, C., & Scott, A. (2021). The validity and reliability of two commercially available load sensors for clinical strength assessment. _Sensors_, 21(24), 1–15. https://doi.org/10.3390/s21248399
