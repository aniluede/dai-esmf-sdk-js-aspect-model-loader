/*
 * Copyright (c) 2022 Robert Bosch Manufacturing Solutions GmbH
 *
 * See the AUTHORS file(s) distributed with this work for
 * additional information regarding authorship.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * SPDX-License-Identifier: MPL-2.0
 */

import {CharacteristicInstantiator} from '../characteristic/characteristic-instantiator';
import {MetaModelElementInstantiator} from '../meta-model-element-instantiator';
import {NamedNode, Quad} from 'n3';
import {Characteristic} from '../../aspect-meta-model';
import {PredefinedUnitInstantiator} from '../predefined-unit-instantiator';
import {DefaultQuantifiable} from '../../aspect-meta-model/characteristic/default-quantifiable';

export class QuantifiableCharacteristicInstantiator extends CharacteristicInstantiator {
    constructor(metaModelElementInstantiator: MetaModelElementInstantiator, nextProcessor: CharacteristicInstantiator) {
        super(metaModelElementInstantiator, nextProcessor);
    }

    protected processElement(quads: Array<Quad>): Characteristic {
        const quantifiable = new DefaultQuantifiable(null, null, null, null, null);

        quads.forEach(quad => {
            if (this.metaModelElementInstantiator.sammC.isUnitProperty(quad.predicate.value)) {
                quantifiable.unit = new PredefinedUnitInstantiator(this.metaModelElementInstantiator).createUnit(quad.object.value);
            }
        });

        return quantifiable;
    }

    shouldProcess(nameNode: NamedNode): boolean {
        return this.metaModelElementInstantiator.sammC.QuantifiableCharacteristic().equals(nameNode);
    }
}
