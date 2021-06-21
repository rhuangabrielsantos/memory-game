import React from 'react'
import { motion } from 'framer-motion'
import Logo from './../assets/logo.svg'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as CardActions from '../store/actions/cards'

const Card = ({ options, isOpen, flipCard, validateMatch }) => {
  const variants = {
    open: { rotateY: 0 },
    closed: { rotateY: 180 },
  }

  function invokeFunction(id) {
    flipCard(id)

    sleep(780).then(() => {
      validateMatch()
    })
  }

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  return (
    <motion.div
      className="w-16 h-16 md:w-28 md:h-28"
      style={{
        position: 'relative',
        float: 'left',
        margin: 5,
      }}
    >
      <motion.div
        className="bg-dracula flex items-center justify-center w-16 h-16 md:w-28 md:h-28"
        style={{
          borderRadius: 10,
          position: 'absolute',
          WebkitBackfaceVisibility: 'visible',
        }}
        initial={{ rotateY: 0 }}
        animate={isOpen ? 'open' : 'closed'}
        variants={variants}
        transition={{ duration: 1 }}
        onClick={() => invokeFunction(options.id)}
      >
        <img src={Logo} alt="logo" className="w-3/4" />
      </motion.div>

      <motion.div
        className="bg-vonCount flex items-center justify-center w-16 h-16 md:w-28 md:h-28"
        style={{
          borderRadius: 10,
          position: 'absolute',
          WebkitBackfaceVisibility: 'hidden',
        }}
        initial={{ rotateY: 0 }}
        animate={isOpen ? 'open' : 'closed'}
        variants={variants}
        transition={{ duration: 1 }}
        onClick={() => flipCard(options.id)}
      >
        <img src={options.img} alt="object" className="w-3/4" />
      </motion.div>
    </motion.div>
  )
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CardActions, dispatch)

export default connect((state) => ({}), mapDispatchToProps)(Card)
