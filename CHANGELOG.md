## [0.2.1](https://github.com/rodekruis/ADA-API/compare/v0.2.0...v0.2.1) (2023-02-21)


### Bug Fixes

* use validation pipes for path params ([4f34e5e](https://github.com/rodekruis/ADA-API/commit/4f34e5ea85df7604109d921a6e5c85c0573ef1d1))



# [0.2.0](https://github.com/rodekruis/ADA-API/compare/v0.1.1...v0.2.0) (2023-01-25)


### Features

* remove building damage and population affected layers ([ab638fa](https://github.com/rodekruis/ADA-API/commit/ab638fac414f06cb4e3cb2602f54034564ecf69a))



## [0.1.1](https://github.com/rodekruis/ADA-API/compare/v0.1.0...v0.1.1) (2023-01-05)


### Bug Fixes

* remove image name from local image ([5f41fe2](https://github.com/rodekruis/ADA-API/commit/5f41fe26db0930cb356bbb279a201519f9662b40))



# [0.1.0](https://github.com/rodekruis/ADA-API/compare/97e6ed83b66ca386b201baf7b8436891ef4b50b4...v0.1.0) (2023-01-04)


### Bug Fixes

* add env variables to docker file, catch missing bearer error ([ee58291](https://github.com/rodekruis/ADA-API/commit/ee582911dcbf7c889351313e85b1515ebca9dc1c))
* date and version columns should not be overwritten during update ([049e85a](https://github.com/rodekruis/ADA-API/commit/049e85a143f2208e9f698bdfd7253fb209b307ed))
* delete event should cascade delete event code ([58e1c70](https://github.com/rodekruis/ADA-API/commit/58e1c70a86243a56eaaea1a2f83efbdf6dcce48b))
* delete event should cascade delete event layers ([05552a0](https://github.com/rodekruis/ADA-API/commit/05552a049e0aab4c2a4715d2df1e11de1e021340))
* event layers should have many to one relationship with event ([2ec9963](https://github.com/rodekruis/ADA-API/commit/2ec9963a6fe6b6700e2e7ea627f4afb190ddf200))
* lint and test issues ([b8d7d86](https://github.com/rodekruis/ADA-API/commit/b8d7d8653f06a107a8731517ed406d59713fef79))
* modify percentage damage to float type ([3c75d47](https://github.com/rodekruis/ADA-API/commit/3c75d47a6804516e4bbeb6d9242bf3de426d8805))
* put update and delete events behind admin guard ([0e8fb14](https://github.com/rodekruis/ADA-API/commit/0e8fb14eb906e88f5c6d706afa2fc13385f331bb))
* remove console log statements ([4178cea](https://github.com/rodekruis/ADA-API/commit/4178ceac9da83a2a4202d6722d57a4acb3437b09))
* throw unauthorized for private event access without auth ([f882c4c](https://github.com/rodekruis/ADA-API/commit/f882c4c7a903e4f7a3fc6b0426558154b5a4f344))
* update version if event layer is updated ([8442a7f](https://github.com/rodekruis/ADA-API/commit/8442a7fe322e2da43e196d67ff5c5ecf96c77325))
* updating accessed time should not change the event code ([8ce9ae9](https://github.com/rodekruis/ADA-API/commit/8ce9ae916f0c6a073267341167c40a995b489a63))


### Features

* add event layer entity and service ([64d9f08](https://github.com/rodekruis/ADA-API/commit/64d9f084d8a3f1d50df6384d298c9d1760b9243d))
* add event layer table ([9d7f423](https://github.com/rodekruis/ADA-API/commit/9d7f423ad42cdc8b88b87ff2c79f98d8e8e3623e))
* add geometry column to event entity ([09e98f4](https://github.com/rodekruis/ADA-API/commit/09e98f4824b0aefbaed7b5e2206f953ff5b60c2a))
* add get endpoint to list all event layers ([41c7045](https://github.com/rodekruis/ADA-API/commit/41c7045398db2fbeba999803d9566ef221b75cf3))
* allow admins to bypass event guard ([4e86a1a](https://github.com/rodekruis/ADA-API/commit/4e86a1acfbbc9c59dab42d6ccec37481e6de3f77))
* check public events before checking private event token ([fa39e06](https://github.com/rodekruis/ADA-API/commit/fa39e0656653b929b7b8046035ef2211852378da))
* create nestjs app with migrations and event ([97e6ed8](https://github.com/rodekruis/ADA-API/commit/97e6ed83b66ca386b201baf7b8436891ef4b50b4))
* event codes ([7d419fa](https://github.com/rodekruis/ADA-API/commit/7d419fad2f6eb13d0565830ccf0092b43db1d926))
* increase payload limit size to 100mb ([41f889a](https://github.com/rodekruis/ADA-API/commit/41f889a5f09da60dd348c6935ab9db29791610c8))
* jwt ([4074b11](https://github.com/rodekruis/ADA-API/commit/4074b11225c8fea3905ea0cf112a516eb23ae648))
* rename enums and use json instead of strings ([8910cb6](https://github.com/rodekruis/ADA-API/commit/8910cb6bedd8d6fc29bf86331922c45c5b4c047c))
* update event types ([7f5fb76](https://github.com/rodekruis/ADA-API/commit/7f5fb763f9eb5734c4046a9f3d4cdcd0863e068f))
* upgrade typeorm ([369b267](https://github.com/rodekruis/ADA-API/commit/369b26763a59b46f268d0bb90edf03887605b125))



