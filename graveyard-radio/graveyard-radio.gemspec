# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "graveyard-radio"
  spec.version       = "0.1.0"
  spec.authors       = ["maxime-castelli"]
  spec.email         = ["maxime@doers.fr"]

  spec.summary       = "A blog theme for music"
  spec.homepage      = "https://github.com/maximecastelli/graveyard-radio.git"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|LICENSE|README)}i) }

  spec.add_runtime_dependency "jekyll", "~> 3.6"

  spec.add_development_dependency "bundler", "~> 1.12"
  spec.add_development_dependency "rake", "~> 10.0"
end
